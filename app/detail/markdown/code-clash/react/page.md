게임의 특징이라고 하면 정상적은 흐름, 개발자의 의도대로 플로우가 진행되며 게임이 진행되도록 하는 경우가 대부분이다.
코드 클래시도 마찬가지로 아래와 같은 흐름을 가진다.

로그인 → 로비 접속 - 방 접속 → 게임 → 결과 → 방

-는 양방향, →는 단방향의 흐름으로 이루어져 있다.
이렇게 의도된 대로 작동하도록 코드를 작성하는데 문제는 사용자가 의도치 않은 라우팅을 할 때이다.
예를들어 게임중에 갑자기 로비로 url을 쳐서 들어가거나 , 혹은 실수로 결과창에서 뒤로가기로 게임 페이지로 접속하려고 할 때이다.
물론 모든 경우의 수에 따라 일일이 예외 처리를 하는게 당연히 베스트겠지만 시간의 문제도 있어서 가능하면 클라이언트 측에서 비정상적인 접근을 원천 봉쇄 하는것이 좋다.

# App.tsx의 구조

```jsx
const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-defaultPattern bg-cover w-screen h-screen">
      <MusicPlayer />
      <AnimatePresence initial={false} mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectRoute to="/login" />}>
            <Route element={<SocketProvider />}>
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/room" element={<RoomPage />} />
              <Route path="/game" element={<GamePlayPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/lobby" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
```

Animation을 위한 AnimatePresence가 있고 Routes로 Navigate를 제공한다. 그런데 중간에 ProtectRoute라는 컴포넌트가 있는데 이는 사용자의 비정상적인 접속을 막기 위한 처리를 하는 컴포넌트이다. 어떤 내용인지 아래에서 자세히 보자.

# 이상한 주소를 쳤다면

```jsx
<Route path="*" element={<Navigate to="/lobby" />} />
```

누군가 예상치 못하게 [[codeclash.site/비밀스런공간](http://codeclash.site/%EB%B9%84%EB%B0%80%EC%8A%A4%EB%9F%B0%EA%B3%B5%EA%B0%84)](http://codeclash.site/비밀스런공간) 이런식으로 작성하고 들어오려 한다면 어떨까?

보통은 404 혹은 React Router같은 경우에는 해당하는 페이지가 없으므로 아무것도 띄우지 않는다. 이를 방지하고자 정해지지 않은 url로 접속시에는 로비로 보낸다.

# 새로고침? 정말 할 것인가?

```jsx
useEffect(() => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };
  window.addEventListener("beforeunload", preventClose);

  return () => {
    window.removeEventListener("beforeunload", preventClose);
  };
}, []);
```

새로고침 동작을 하면 의도치 않은 동작이 이루어질 가능성이 높아서 사용자에게 경고를 한번 띄워 주도록 한다.

# 어? 정보가 없는데 페이지를 접근하려한다?

```tsx
useEffect(() => {
  if (!roomId && currentLocation.pathname !== "/lobby") {
    navigate("/lobby");
  }
}, [roomId]);
```

roomId가 없는데 접속하려는 페이지가 roomId를 필요로 한다면? 이를 차단하고 로비 페이지로 돌려 보낸다.

# 게임이 정상적으로 진행되면 뒤로가기를 누를 일이 없다.

```jsx
const history = createBrowserHistory();

export const useBlock = () => {
  const location = useLocation();
  useEffect(() => {
    const unlisten = history.listen((his) => {
      if (his.action === "POP") {
        history.push(location);
      }
    });
    return unlisten;
  }, [location]);
};
```

history가 변경될 때 변경 action이 뒤로가기 인가 체크하고 뒤로가기라면 현재 위치를 스택에 넣어 뒤로가기를 무마시킨다.
그러면 의문이 들 수 있는게 링크로 접속하고 나면 뒤로가기가 정상적으로 진행되지 않는 것 아니냐? 라고 할 수 있다.
정상적으로 잘 된다. 다만 로비에 접속한 순간부터는 뒤로가기가 차단된다.
왜냐하면 lobby의 흐름부터 protectRoute가 동작하고 login에서는 동작하지 않기 때문이다.

# 로그인도 안했는데 로비에 들어오려 한다

```tsx
return isLogin === isNeedLogin ? (
  <Outlet />
) : (
  <Navigate to={to} replace state={{ redirectedFrom: currentLocation }} />
);
```

로그인 되어 있는지 확인해서 안되어 있다면 로그인 페이지로 돌려보내고 로그인 되어 있다면 원래 보여줘야 할 페이지를 보여준다. 여기서 replace를 안해주면 외부접속해서 뒤로가기를 눌러도 계속 로그인 페이지에 갇히게 되므로 replace를 해주고 로그인 성공시에는 원래 가려던 페이지로 보내야 하므로 리다이렉션 된 원래 주소로 보낸다.
