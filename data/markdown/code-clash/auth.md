# Axios Interceptor를 사용하여 JWT 토큰 관리

# JWT vs Session

## JWT

Json Web Token.
인증 정보를 서버에서 가지고 있는 것이 아닌 클라이언트가 직접 가지고 있는 방식.
서버에서 생성되고 이를 클라이언트에 전달하여 저장한다.
토큰 상에는 로그인에 필요한 정보가 있지만 이는 역으로 디코딩이 가능하기에 매우 간단한 정보 (이름, 이메일 정도) 만 넣는다.
해당 토큰을 http 요청시 인증 헤더에 담아 보내고 서버는 해당 토큰이 유효한지 체크하여 인증한다.

## Session

사용자의 인증 정보가 클라이언트가 아닌 서버 메모리에 저장되는 방식.
로그인시 인증 정보를 세션 저장소에 저장하고 세션 아이디를 사용자에게 발급한다.
클라이언트가 쿠키 헤더에 세션 아이디를 첨부해 보내면 서버는 이를 조회해 사용자를 검증한다.

## 큰 차이점

- JWT는 성능이 비교적 좋으나(속도) 보안성이 떨어진다.
- Session은 성능이 비교적 떨어지나(속도) 보안성이 높다.
- 또한 다중 서버의 환경에서도 세션 불일치의 문제를 겪을 수 있으나 JWT 기반 인증은 이러한 문제에서 비교적 자유롭다.

## JWT를 선택한 이유

- 확장성 (추후 프로젝트가 지속된다면 서버 확장도 시도해 볼 수도 있음)
- 학습의 목적

## Access Token

사용자 인증정보를 담고 있는 토큰. 이를 통해 인증을 진행한다. 그러나 탈취의 위험이 있고 복호화될 위험성이 존재해 간단한 정보만을 담고 있다. stateless 하기 때문에 해커가 탈취해도 서버상에서는 알 길이 없기 때문에 유효시간을 짧게 설정하고 유효시간이 짧아지면 사용자가 자주 로그인을 시도해야하기에 Refresh Token을 통해 이를 보완해준다.

## Refresh Token

Access Token의 유효시간이 만료 시에 이를 통해 새로운 Access Token을 받을 수 있게 하는 토큰. 정보는 사용자의 정보를 담고 있어도 되고 관계없는 UUID를 담고 있어도 된다. AT의 재발급을 돕는 특징으로 인해 AT보다 긴 유효시간을 가진다.

RT로 DB에서 유저 정보 조회 → 유저 정보를 통해 새로운 AT 생성 → 해당 AT를 클라이언트에게 전달 하는 과정을 통해 AT를 갱신시켜준다.

## Refresh Token Rotation

근데 RT 조차 털린다면 어떻게 해야할까? RT가 한번 털렸다고 계속 RT를 통해 AT가 생성되면 보안에 큰 문제가 발생할 것이다. 그래서 RT를 통해 AT를 만들면 db에 있는 해당 RT를 수정해서 하나의 키값으로는 한번만 생성할 수 있게 한다. 이를 다시 클라이언트에게 전달한다. 해당 방법은 아직 적용되지 않았다.

# 토큰 저장을 어디에 했는가?

결론부터 말하면 AT는 Session Storage, RT는 httponly Cookie에 저장하는데 이유는 다음과 같다.

- 해당 논쟁은 정답은 없다. 둘다 xss, csrf의 약점을 가지고 있다.
- 그래서 둘다 사용해서 학습의 목적도 존재한다.
- 여러 Api에서 인증의 용도로 사용해야 하는 AT는 클라이언트에서, 오직 AT를 위해 동작하는 RT는 cookie가 적합하다고 판단했다.

# Axios Interceptor… 뭐하는 애인가?

Axios는 Rest Api를 처리하기 더 편하게 도와주는 라이브러리이다. interceptor는 요청이 발생하면 해당 요청을 가로채고 콜백 함수를 반드시 거쳐가도록 미들웨어를 등록할 수 있게 한다.

```javascript
baseAxios.interceptors.request.use(refreshAccessToken, refreshErrorHandle);
```

해당 코드의 의도는 액세스 토큰을 리프레시 하도록 하고, 에러가 발생하면 에러를 에러핸들러 함수로 보낸다.

```typescript
export const refreshAccessToken = async (
  config: InternalAxiosRequestConfig
) => {
  const {
    expireTime,
    loginAt,
    isLogin,
    setAccessToken,
    setLoginAt,
    accessToken,
  } = useLoginStore.getState();

  if (!isLogin) return config;

  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  const now = new Date().getTime();
  const diff = now - loginAt;

  if (diff > expireTime) {
    const accessToken = (
      await baseAxios.post("https://codeclash.site/api/auth/token/access")
    ).data.accessToken;

    if (accessToken) {
      setAccessToken(accessToken);
      setLoginAt(now);
    }

    config.headers.Authorization = "Bearer " + accessToken;
  }

  return config;
};
```

현재 로그인 상태를 가져오고 이를 기반으로 토큰을 조작한다.

그러나 문제가 있다.
인터셉터로 중간 동작을 훔쳐왔는데 다시 토큰이 필요하다고 또 baseAxois를 호출했다. 이러면
baseAxios 호출 → 인터셉터 동작 → baseAxios 호출 무한반복이다.

그래서

```typescript
const accessToken = (
  await axios.post("https://codeclash.site/api/auth/token/access")
).data.accessToken;
```

이와 같이 변경해 자기 자신을 호출할 일을 없앴다.
참고로 Refresh Token은 httponly 쿠키에 저장되어있어 클라이언트 측에서 특별하게 처리해주지 않아도 된다.

# 클라이언트의 시간으로 판단해도 될까?

위의 코드를 보면 클라이언트 시간을 보고 서버에서 등록한 시간이 지나면 새로 발급받도록 만들었는데 그것보단 사실 인증이 제대로 안되는 상황이면 RT를 통해 재시도하도록 하는게 맞다고 판단해서 이와 같이 수정했다. 만약 인증인가가 실패한 상황이면 AT를 새로 발급받고 기존의 요청을 다시 시도하도록 한다.

```typescript
baseAxios.interceptors.response.use(onResponse, onFailed);
baseAxios.interceptors.request.use(admitAccessToken);

export const onFailed = async (error: any) => {
  const { config, response } = error;
  const { setAccessToken } = useLoginStore.getState();
  if (response?.status === 401) {
    const originalRequest = config;
    const res = await axios.get(`${baseURL}/api/auth/token/access`, {
      withCredentials: true,
    });
    setAccessToken(res.data.accessToken);
    return axios({
      ...originalRequest,
      headers: {
        Authorization: "Bearer " + res.data.accessToken,
      },
      withCredentials: true,
    });
  }
  return Promise.reject(error);
};

export const admitAccessToken = async (config: InternalAxiosRequestConfig) => {
  const { accessToken } = useLoginStore.getState();
  if (!accessToken) return config;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
```

또한 기본적으로 accessToken이 상태변경에 따라 바뀌도록 요청 전에는 반드시 헤더를 변경하도록 만들었다.
