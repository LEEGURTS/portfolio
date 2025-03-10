# 초기에는 어땠는가?

저희팀은 JWT를 사용했고 백엔드 설계상 BE가 헤더에 실어서 값을 보내주는 형태였습니다.
그런데, 헤더에 Response를 전달하면 브라우저 상에서는 Cors가 존재하는 한 정해진 헤더만 읽을 수 있습니다.

# Cookie VS Response Body

그래서 보통 사용하는 두 가지 방식중 택해야했습니다.

## Response Body

아마 보안성을 생각한다면, AT를 response body로 받고 이를 JS 인메모리 상에서 관리하는것이 가장 보안적으로 안전하다고 생각합니다. 패킷 감청을 제외하고는, 메모리상의 변수를 해킹하는 방법은 매우 어렵기 때문입니다. 그러나 다음과 같은 문제가 있습니다.

- 현재 BE가 header에 실어주므로 새롭게 구현해야 할 사항이 생김
- 프론트엔드, React 측에서 토큰을 관리하고 사용해야 함. 복잡도 상승
- Next.js 와의 연계성에 문제 발생.

입니다. 그림으로 알아보겠습니다.  
![image](https://github.com/user-attachments/assets/af486e45-0cb3-4fca-b76b-42830a603b22)  
이 과정에서 보면 Next.js 서버를 이용해 인가 필요한 페이지를 SSR을 통해 생성하려 시도시에, AT는 Client가 가지고 있으니 인가가 불가능하다는 문제점을 가지고 있습니다.

![image](https://github.com/user-attachments/assets/04d5f842-b6f6-4e30-a8d0-0b4880043bdd)

그래서 이를 해결하고자, 클라이언트 측에서 값을 받으면 변수에 저장, 이를 인가 페이지 접속시에 header에 실어주고 이를 next가 사용하는 방법을 생각했습니다.  
문제는 새로고침입니다. 새로고침 시도시 메모리에 저장되어 있던 토큰은 휘발됩니다. 그러면 클라이언트 측에서 다시 RT를 통해 AT를 발급받아야 하고 이는 두가지 문제를 야기합니다.

- 매번 RT,AT가 생성되는 오버헤드
- 인가가 필요한 Page Route를 클라이언트에게 맞겨야 함.
  사실 두번째는 문제는 아닙니다만, 가능한 Next.js의 특징을 살려 서버측에서 인증인가를 해 보고 싶었습니다.(학습 목적)

## Cookie

쿠키를 사용하면 아래와 같은 과정을 거칩니다.  
![image](https://github.com/user-attachments/assets/080ec9b2-4209-428e-a92e-dc4d9e68bc23)
별다른 추가 작업이 없어도 Next.js에서 이를 활용하기 쉽고, AT의 존재로 인해 비인가 리다이렉션 또한 서버측에서 수행하기 쉬워지는 장점이 있습니다.
단점은 모든 요청에 AT,RT가 동봉되므로 패킷 오버헤드가 발생하는 문제가 있습니다.

저희 팀은 Cookie를 선택했습니다. 개발의 용이성, Next.js 서버 사이드 기능을 최대화(학습 목적) 이 2가지를 선택했습니다.

## Proxy

하지만 쿠키를 적용하고 나서 개발단계에서 Next.js가 쿠키값을 확인하지 못하는 문제가 있었습니다. AWS에서 발급된 쿠키는, localhost에서 사용할 수 없었습니다.

따라서 Proxy를 통해 해당 요청쿠키가 백엔드로도 전달될 수 있도록 구현했습니다.

```ts
const nextConfig = {
 ...
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://server.com/api/:path*',
      },
    ];
  },
};
```

또한 Next.js에 전달 되었다고 해도, 해당 쿠키가 AWS에 있는 Spring에 전달되지는 않습니다. Next.js 의 Server Component에서 요청시에 쿠키가 같이 들어가지 않으므로 Next.js의 API Reference 중 하나인 cookies를 사용해 요청시 쿠키를 주입했습니다.

```ts
export const FetchWithCookie = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  if (process.env.NODE_ENV === "production" && isServer) {
    try {
      const cookies = await getServerCookies();
      const cookieString = cookies().toString();
      return Fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          "Content-Type": "application/json",
          Cookie: cookieString,
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to get server cookies:", error);
      // 에러 상황에 대한 폴백 처리
      return Fetch(input, {
        ...init,
        credentials: "include",
      });
    }
  }

  return Fetch(input, {
    ...init,
    credentials: "include",
  });
};

export const FetchWithJWT = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const res = await FetchWithCookie(input, init);

  if (res.status === 401) {
    const tokensRequest = await fetch("/api/reissue", init);
    if (!tokensRequest.ok) redirect("/login");

    if (process.env.NODE_ENV === "production" && isServer) {
      const cookiesPromise = await getServerCookies();
      const cookies = await cookiesPromise();
      const newCookies = tokensRequest.headers.get("set-cookie")?.split(";");

      newCookies?.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookies.set(name, value);
      });
    }

    return FetchWithCookie(input, init);
  } else {
    return res;
  }
};
```

## redirect

그러나 intercept route 페이지로 redirect시 무한루프 되는 버그가 Next.js에 있었습니다.
하지만 이미 Parallel Route와 Intercept Route를 조합한 Modal Page를 구현해 Login 페이지를 개발했었습니다.
그래서 이를 해결하고자 Next.js 소스코드를 분석해 해결했습니다.

<details>
<summary><b>분석 과정</b></summary>
# 문제 발생
프론트엔드 개발을 하면서 인증 유무에 따른 페이지 보호를 구현하고 있었습니다.
프로젝트에 JWT를 사용중이라 다음처럼 구현했습니다.
``` ts
export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const res = await fetch(input, init);

if (res.status !== 401) return res;

const tokensRequest = await fetch('/api/reissue', init);
if (!tokensRequest.ok) redirect("/login");

return fetch(input, init);
};

````
401 인증 실패가 뜬다면 refresh token으로 다시 access token을 요청하고 만약 실패한다면 login 페이지로 리다이렉션 하도록 구현했습니다.

그리고 로그인 페이지의 라우팅 구조는 다음과 같습니다.
```tree
├─login
├─@modal
│  ├─(.)login
````

next.js의 Intercept Route와 Parallel Route 기능을 사용해 두가지 화면을 제작했습니다.
![](https://velog.velcdn.com/images/leeguts/post/668bfad4-773c-4e5d-8a08-732d9f3fa498/image.png)
![](https://velog.velcdn.com/images/leeguts/post/956e0ce4-b0cd-4c99-895c-7b50e0dd80c4/image.png)
소프트 네비게이션으로 이동시에는 모달로 뜨도록, 하드 네비게이션으로 이동시에는 페이지로 이동하도록 구현했습니다.

그러나 인증이 필요한 페이지 접속시시 로그인을 하지 않았다면 네비게이션이 되지만 다음처럼 요청이 무한으로 발생하는 버그가 발생했습니다.
![](https://velog.velcdn.com/images/leeguts/post/cedc0131-bc4e-4a65-b7ce-fb2c0e0ca022/image.png)

# 해결법

## Redirect는 어떻게 이루어지나?

직접 하나씩 따라가보겠습니다. Next.js는 오픈소스이므로 https://github.com/vercel/next.js 를 클론해 직접 확인 하실 수 있습니다.

```ts
export function redirect(url: string, type?: RedirectType): never {
  const actionStore = actionAsyncStorage.getStore();
  const redirectType =
    type || (actionStore?.isAction ? RedirectType.push : RedirectType.replace);
  throw getRedirectError(
    url,
    redirectType,
    RedirectStatusCode.TemporaryRedirect
  );
}
```

저희가 호출했던 redirect 함수 입니다. 에러를 throw 하고 있고 해당 에러는 아래의 코드로 만들어집니다.

```ts
export function getRedirectError(
  url: string,
  type: RedirectType,
  statusCode: RedirectStatusCode = RedirectStatusCode.TemporaryRedirect
): RedirectError {
  const error = new Error(REDIRECT_ERROR_CODE) as RedirectError;
  error.digest = `${REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
  return error;
}
```

digest에 redirection에 관한 내용을 ;로 분리하며 작성해준 에러를 반환합니다.

```tsx
function HandleRedirect({
  redirect,
  reset,
  redirectType,
}: {
  redirect: string;
  redirectType: RedirectType;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    React.startTransition(() => {
      if (redirectType === RedirectType.push) {
        router.push(redirect, {});
      } else {
        router.replace(redirect, {});
      }
      reset();
    });
  }, [redirect, redirectType, reset, router]);

  return null;
}

export class RedirectErrorBoundary extends React.Component<
  RedirectBoundaryProps,
  { redirect: string | null; redirectType: RedirectType | null }
> {
  constructor(props: RedirectBoundaryProps) {
    super(props);
    this.state = { redirect: null, redirectType: null };
  }

  static getDerivedStateFromError(error: any) {
    if (isRedirectError(error)) {
      const url = getURLFromRedirectError(error);
      const redirectType = getRedirectTypeFromError(error);
      return { redirect: url, redirectType };
    }
    // Re-throw if error is not for redirect
    throw error;
  }

  // Explicit type is needed to avoid the generated `.d.ts` having a wide return type that could be specific to the `@types/react` version.
  render(): React.ReactNode {
    const { redirect, redirectType } = this.state;
    if (redirect !== null && redirectType !== null) {
      return (
        <HandleRedirect
          redirect={redirect}
          redirectType={redirectType}
          reset={() => this.setState({ redirect: null })}
        />
      );
    }

    return this.props.children;
  }
}
```

그리고 throw 된 에러는 여기서 처리합니다.
react class 문법중에는 getDerivedStateFromError 라는 문법이 있습니다.

### getDerivedStateFromError

해당 static 메서드는 하위 컴포넌트에서 발생하는 에러를 캐치해서 렌더링 단계에서 상태를 반환하는 메서드 입니다.

즉, 이 Boundary 하위에서 발생한 에러 중, redirect Error를 대상으로 redirect state를 지정하고 이 state를 기반으로 redirection 해주는 컴포넌트를 렌더링 하는 방식으로 구성되어 있습니다.

![](https://velog.velcdn.com/images/leeguts/post/330d3733-1c09-43ff-9b60-e3d467d591a1/image.png)
또한 Next.js의 render된 트리구조를 보면 다음과 같이 AppRouter가 존재합니다. 해당 AppRouter 내부에는 다음과 같은 코드가 있습니다.

```ts
useEffect(() => {
  // Ensure that any redirect errors that bubble up outside of the RedirectBoundary
  // are caught and handled by the router.
  function handleUnhandledRedirect(event: ErrorEvent | PromiseRejectionEvent) {
    const error = "reason" in event ? event.reason : event.error;
    if (isRedirectError(error)) {
      event.preventDefault();
      const url = getURLFromRedirectError(error);
      const redirectType = getRedirectTypeFromError(error);
      if (redirectType === RedirectType.push) {
        appRouter.push(url, {});
      } else {
        appRouter.replace(url, {});
      }
    }
  }
  window.addEventListener("error", handleUnhandledRedirect);
  window.addEventListener("unhandledrejection", handleUnhandledRedirect);

  return () => {
    window.removeEventListener("error", handleUnhandledRedirect);
    window.removeEventListener("unhandledrejection", handleUnhandledRedirect);
  };
}, [appRouter]);
```

주석에도 나와 있듯 redirect error가 boundary 밖에서 발생할 경우 해당 이벤트 리스너에서 캐치해 없애도록 구현되어 있습니다.

길었지만 한마디로 정의하자면 redirect 를 하고자 하면 redirect error를 발생시키고 이를 catch해서 핸들링하는 함수를 통해 redirect를 하는 것이였습니다.

## Next.js의 라우팅

### Parallel Route

https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
Next.js는 slot라는 개념이 있습니다.
![](https://velog.velcdn.com/images/leeguts/post/527f3d16-6190-4a58-a0e9-e8923d2cf0d4/image.png)
이렇게 레이아웃에 페이지를 띄우는 구조를 슬롯이라고 하며 슬롯이 여러개면 Parallel Route라고 지칭합니다. Next.js에서는 기본적으로 @children이라는 슬롯이 숨겨져 있고 이는 저희가 작성하는 폴더 자체를 의미합니다. 그래서 @login 하나만 추가 했어도 parallel route라고 지칭합니다.

### Intercept Route

https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

말 그대로 라우팅을 가로채는 기능입니다.
![](https://velog.velcdn.com/images/leeguts/post/9285103e-9cc8-493e-bae7-f9c0172638a3/image.png)
이와 같은 라우팅 구조에서 photo로 soft navigate시에는 /feed/(..)photo 안에 있는 page를, hard navigate 시에는 /photo 에 있는 페이지를 보여줍니다.

## 문제가 발생한 이유

정상적인 로그인 페이지로의 이동은 다음과 같습니다.

1. 로그인 모달로 route
2. children slot 에는 기존 화면 유지
3. modal slot에는 intercept한 로그인 모달 출력

문제가 발생한 플로우는 다음과 같습니다.

1. 인증이 필요한 페이지로 접속
2. 인증이 필요한 페이지의 slot은 children과 modal로 구성되어 있음
3. children slot에서 redirect 시에 error를 throw
4. RedirectErrorBoundary의 render()에서 원래 출력해야할 컴포넌트 대신 HandleRedirect 컴포넌트에서 route 동작 수행
5. navigate 이후 원래 출력되어야 할 children이 출력됨
6. 그러나 modal slot에서 login 페이지에 대한 navigate를 intercept 했으므로 children slot의 결과물은 변경되지 않아 원래 있던 인증 요구 페이지가 그대로 있음.
7. 따라서 modal slot 상에서는 login 모달이 잘 출력되나, children slot은 redirect를 유발하는 컴포넌트가 그대로 남아 있으므로 해당 과정이 무한 반복
</details>
분석결과 redirect를 핸들링 하는 부분을 발견했고 해당 코드에서 같은 url로 리다이렉션을 방지했습니다.

```ts
function HandleRedirect({
  redirect,
  reset,
  redirectType,
}: {
  redirect: string;
  redirectType: RedirectType;
  reset: () => void;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if the redirect is the same as the current URL
    // This can cause an infinite loop if not checked
    if (
      redirect ===
      pathName + (searchParams.size > 0 ? "?" + searchParams.toString() : "")
    ) {
      return;
    }
    React.startTransition(() => {
      if (redirectType === RedirectType.push) {
        router.push(redirect, {});
      } else {
        router.replace(redirect, {});
      }
      reset();
    });
  }, [redirect, redirectType, reset, router, pathName, searchParams]);

  return null;
}
```

해당 코드를 통해 intercept route 페이지로 redirect 를 시도해도 무한루프에 빠지지 않도록 버그를 수정했습니다.
