# 방 스스로가 정보를 가져오지 못한다.

## 웹소켓

현재 방 정보, 로비 정보를 가져오기 위해서는 소켓을 거쳐야 한다.

```typescript
const handleLobbyConnect = ({ gameRoomList, userList }: LobbyState) => {
    setLobby({ userList, gameRoomList });
  };

...
socket.on("connection", handleLobbyConnect);
```

이와같이 소켓 연결이 발생했을 때 정보를 가져와서 로비 정보를 지정해준다.

## 문제

로비 페이지 스스로 정보를 가져올 수 없다 (?)
무슨 소리냐고 하면 connection은 소켓의 접속이 있을때 발생하는 이벤트이다. 근데 React에서 라우팅을 한다고 매번 소켓의 재접속이 발생하지 않는다. 따라서 navigate 시에 아무것도 나오지 않는 현상이 발생한다.

## 어떻게 찾았나?

```typescript
//protectroute.tsx
const { roomId } = useRoomStore();

useEffect(() => {
  if (!roomId && currentLocation.pathname !== "/lobby") {
    window.location.replace("/lobby");
  }
}, [roomId]);
```

라우팅을 보호하는 과정에서 알게 되었다. 방 정보가 없을시에는 로비로 다시 리다이렉션 시켜주려 했는데? navigate로 spa 방식으로 이동시키니 connection 이벤트가 발생하지 않아서 replace 시켜주었다.

## 해결책

분리가 필요하다. 현재 하나의 이벤트가 과도하게 역할을 수행하고 있었다.

```typescript
const { setLobby } = useLobbyStore();

const handleEnterLobby = ({
  status,
  userList,
  gameRoomList,
}: IExitRoomResponse) => {
  if (status === "success") {
    setLobby({ userList, gameRoomList });
    navigate("/lobby");
  }
};

socket.off("exit_room", handleEnterLobby);
```

여기서 문제가 드러났는데 로비페이지가 스스로 필요한 정보를 refresh하지 못하고 있어서 매번 다른 페이지에서 정보를 가져와야하는 문제가 있었다. 이런 구조로 인해 매번 다른 페이지에서 값을 세팅해줘야 했다.

```typescript
const handleLobbyConnect = ({ status }: { status: string }) => {
  if (status === "success") {
    socket?.emit(
      "lobby_info",
      (lobbyInfo: { userList: UserInfo[]; roomList: GameRoom[] }) => {
        setLobby({
          userList: lobbyInfo.userList,
          gameRoomList: lobbyInfo.roomList,
        });
      }
    );
  }
};

socket.emit("enter_lobby", handleLobbyConnect);
```

따라서 정보를 가져오는 부분, 입장처리 부분을 분리해서 페이지가 스스로 이벤트를 발생시키고 정보를 가져 올 수 있도록 개선했다.

# 게임 시작이 안된다.

게임 시작을 하면 귀신같이 게임이 시작이 안됬다. 그 원인을 찾기 위해 서버 게이트웨이 코드, 리액트 코드 모두 다 읽으며 해결을 시도했다. 그러나 이유를 찾기 어려웠는데…

## 리팩토링 하면서 바뀐 결과

이유는 생각보다 간단했다!

```typescript
useEffect(() => {
  if (socket) {
    socket.emit(
      "room_info",
      { roomId },
      ({
        status,
        roomId,
        userList,
        roomName,
        capacity,
      }: ICreateRoomResponse) => {
        if (status === "error") {
          alert("방 정보를 불러오는데 실패했습니다.");
          navigate("/lobby");
        }
        setRoomInfo({
          roomId,
          roomName,
          capacity,
          isStart: false,
          userList,
          problemList: [],
        });
      }
    );
    socket.on("user_enter_room", handleUserEnterRoom);
    socket.on("user_exit_room", handleUserExitRoom);
    socket.on("ready", handleUserReady);
    socket.on("start", handleStart);
  }
  return () => {
    if (socket) {
      socket.emit("exit_room");
      socket.off("user_enter_room", handleUserEnterRoom);
      socket.off("user_exit_room", handleUserExitRoom);
      socket.off("ready", handleUserReady);
      socket.off("start", handleStart);
    }
  };
}, [socket, roomId]);
```

게임 방 페이지의 useEffect인데 보면 return문에서 exit_room 이벤트를 생성하고 있다.
뭐가 잘못되었는가? 생각할 수 있다. 방에서 나가는 정상적인 흐름이라고 생각했는데 방 정보를 삭제하면 게임 내에서 누가 누구랑 같이 있는지 알 수가 없어서 방 페이지에서 게임 페이지로 이동되면서 방 정보가 사라져 버렸기에 정상적인 게임 진행이 불가능했다. 단순히 페이지에서 나오는 것 만 으로는 게임이 시작된 것인지, 그저 방에서 나온 것인지 구별이 어려웠다.

그래서 exit_room은 방에 접속시 오직 “나가기” 버튼 클릭시에만 발생하여 나갈 수 있도록 구별했다.
