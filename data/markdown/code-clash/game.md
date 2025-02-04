# 사용자는 과연 정직한 사람인가?

처음에는 아이템을 클라이언트 측에서 생성하고 서버에 보내면 브로드캐스팅 해서 다른 유저들에게 전달해줬다.
그러나 클라이언트 측에서 가지고 있지도 않는 아이템을 서버로 보내면?
채점 결과가 통과된것도 아닌데 통과되었다고 거짓말로 보낸다면?

상태를 클라이언트만 알고 있었기 때문에 변조 사항을 알 방법이 없다.

## 서버가 하면 된다

그러면 그 아이템 정보를 유저에게 맞길게 아니라 서버에서 직접 관리하면 되는 것이다. 그래서 아이템 생성 과정을 다음과 같이 변경했다.

1. 게임이 시작되면 서버에서 아이템을 생성한다.
2. 아이템을 생성하는 create_item 이벤트를 날리고 아이템 번호를 전송한다.
3. 클라이언트에서 해당 번호를 받고 state에 저장한다.

# 아이템의 상태 관리가 너무 복잡하다.

## 문제상황

- 게임 플레이 페이지를 제작중
- 게임 플레이간에 상호작용을 하면 많은 상태가 발생한다.(아이템의 종류가 다양하다!)
- 각 상태를 따로 생성하고 관리하기엔 복잡도가 높아지는 문제가 발생한다.

## 해결과정

### 상태가 너무 많다면 reducer로 묶자.

- 게임 상호작용을 위해 필요한 상태가 많다.
- 게임 이벤트 상태를 외부에서 사용할 때는 on off만으로 해결 가능해야한다.
- reducer를 통해 on,off 를 받아 그에 맞게 간단한 처리를 해준다.

### react의 useReducer 만으로 해결이 될까?

결과적으로 말하면 실패했다. 이유는 다음과 같다.

- monaco editor의 코드 상태는 useState를 통해 따로 관리된다. 그런데 codeState를 reducer에서 바꿔야 하는 이벤트가 존재하는데 reducer 안에서 외부의 상태까지 변경하는 형태는 적합하지 않다고 판단했다.
- 그래서 codeState까지 그냥 reducer에 포함시킬까 했으나 너무 많은 정보를 reducer에 담게 되어서 책임이 너무 커진다.
- 지속시간이 있는 아이템의 경우 지속시간 이후 상태값을 변경해야하는데 reducer 함수 내부에서 이를 할 수 있는 방법이 없다.

### 리듀서의 동작을 관리하는 핸들러를 추가하자!

- 리듀서 스스로 비동기적으로 끄고 켜지는 상태를 유지 할 수는 없으니 외부의 함수의 도움을 받아 이를 관리한다.
- 핸들러에는 각 아이템 타입에 맞는 동작의 함수를 실행하도록 한다.

## 결과

```typescript
//codeHandler.ts
import { engToKor, korToEng } from "korsearch";
import { GameItemType } from "./gameItemType";

export const gameItemHandler = (
  setCode: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  return (type: GameItemType) => {
    switch (type) {
      case GameItemType.SWAP:
        swapRandomLine(setCode);
        break;
      case GameItemType.REVERSELANGUAGE:
        reverseLanguage(setCode, dispatch);
        break;
      case GameItemType.TINYCODE:
        tinyCode(dispatch);
        break;
      case GameItemType.SCREENBLOCK:
        screenBlock(dispatch);
        break;
      case GameItemType.TYPEBLOCK:
        typeBlock(dispatch);
        break;
      case GameItemType.CRAZYMUSIC:
        crazyMusic();
        break;
      default:
        break;
    }
  };
};

const swapRandomLine = (setCode: React.Dispatch<React.SetStateAction<string>>) => {
  setCode(code => {
    const codeLine = code.split("\n");
    const wholeLineCount = codeLine.length;
    const [firstLine, secondLine] = Array(wholeLineCount)
      .fill(0)
      .reduce((acc, _, idx) => {
        if (codeLine[idx].trim() === "") return acc;
        return acc.concat(idx);
      }, [])
      .sort(() => Math.random() - 0.5);
    [codeLine[firstLine], codeLine[secondLine]] = [codeLine[secondLine], codeLine[firstLine]];
    return codeLine.join("\n");
  });
};

const reverseLanguage = (
  setCode: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  setCode(code => engToKor(code));
  dispatch({ type: GameItemType.REVERSELANGUAGE, act: "on" });
  setTimeout(() => {
    setCode(code => korToEng(code));
    dispatch({ type: GameItemType.REVERSELANGUAGE, act: "off" });
  }, 1000 * 12);
};

const crazyMusic = () => {
  const audioNameList = ["/music/RDD.mp3", "/music/URMan.mp3"];
  const audioIdx = Math.floor(Math.random() * audioNameList.length);
  const audio = new Audio(`/music/${audioNameList[audioIdx]}.mp3`);
  audio.volume = 0.2;
  audio.loop = true;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 1000 * 20);
}

...etc
```

```typescript
//gameItemReducer.ts
import { GameItemType } from "./gameItemType";

interface IGameItemState {
  isScreenBlock: boolean;
  isTypeBlock: boolean;
  isTinyCode: boolean;
  isCrazyMusic: boolean;
  isReverseLanguage: boolean;
  fontSize: number;
}

export const initialGameItemState = {
  isScreenBlock: false,
  isTypeBlock: false,
  isTinyCode: false,
  isCrazyMusic: false,
  isReverseLanguage: false,
  fontSize: 16,
};

export const gameItemReducer = (
  state: IGameItemState,
  action: {
    type: GameItemType;
    act: "on" | "off";
  }
) => {
  switch (action.type) {
    case GameItemType.SCREENBLOCK:
      return {
        ...state,
        isScreenBlock: action.act === "on",
      };
    case GameItemType.TYPEBLOCK:
      return {
        ...state,
        isTypeBlock: action.act === "on",
      };
    case GameItemType.TINYCODE:
      return {
        ...state,
        isTinyCode: action.act === "on",
        fontSize: action.act === "on" ? 8 : 16,
      };
    case GameItemType.CRAZYMUSIC:
      return {
        ...state,
        isCrazyMusic: action.act === "on",
      };
    case GameItemType.REVERSELANGUAGE:
      return {
        ...state,
        isReverseLanguage: action.act === "on",
      };
    default:
      return state;
  }
};
```

```typescript
//GameEventHandler.tsx
const GameEventHandler: React.FC = () => {
  const [code, setCode] = useState("");
  const [gameEventState, disPatchEventState] = useReducer(
    gameItemReducer,
    initialGameItemState
  );

  const handleGameEvent = gameItemHandler(setCode, disPatchEventState);

  useEffect(() => {
    //dev
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      if (key === "Control") {
        handleGameEvent(
          Number(prompt("아이템 인덱스 입력")) ?? GameItemType.SWAP
        );
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      ...etc
      {gameEventState.isScreenBlock && <ScreenBlock />}
    </>
  );
};
```

- reducer상에서는 게임 아이템 이벤트와 관련된 상태만을 저장하고 상태 변경에 따른 매우 기초적인, 반드시 해야하는 동작만 하도록 구성
- gameItemHandler 상에서는 dispatch와 setCode 콜백을 입력받아 아이템 이벤트에 따른 처리를 해주는 함수들을 반환해준다.
- 게임 아이템 관련된 컴포넌트들을 모아놓은 GameEventHandler 컴포넌트상에서 gameItemHandler 함수를 통해 이벤트를 처리하고 상태를 반영해 이벤트를 출력한다.

# 아이템은 동시에 맞을 수도 있다.

- 게임 아이템을 사용하면 상대와 소켓으로 상호작용을 가져 이벤트를 적용시킴.
- 전투상황이 1대 다수이고 또한 아이템은 한번에 2개를 소지할 수 있다.
- 따라서 이벤트가 동시다발적으로 발생할 수 있다.
- 바로 적용이 되는 이벤트 (스왑) 같은 경우는 상관이 없다.
- 그러나 음악재생, 화면 깜빡임 같은 지속적인 효과를 주는 아이템은 겹칠시에 문제가 발생할 수 있다. 겹칠시에 예상치 못한 타이밍에 아이템의 효과가 풀린다거나 하는 문제가 있다.

## 해결 과정

### 지속시간 처리를 어떻게 할 것인가?

- 기존의 시간을 새롭게 갱신할 것인가? 기존의 시간에 더할 것인가?
- 새롭게 갱신하는 것이 구현 면에서 난이도가 낮다.
- 밸런스 면에서도 적합하다.

### 현재 gameItemHandler 함수들은 어떻게 되어 있는가?

- 지속시간이 있는 아이템의 경우 아이템 상태를 켠 후 setTimeout을 통해 일정 시간 후에 아이템 상태를 끈다.
- 그렇다면 setTimeout 의 지속시간을 갱신하면 되지 않겠는가?

### 어떻게 지속시간을 갱신할까?

1. id값은 상태값이 아니여도 상관 없으므로 여러 timerID를 보관하는 객체를 하나 만든다.
2. setTimeout의 id값을 timerID에 저장하도록 하고 시간이 지나면 0으로 초기화한다.
3. 재실행될때 timerID가 0인지 확인하고 0이 아니라면 clearTimeout을 호출해 제거 후 새로 setTimeout을 호출한다.
4. 중복 호출시에 기존 타이머가 해제되므로 지속시간이 갱신되는 효과를 얻을 수 있다.

```typescript
const timerID: {
  screenBlock: ReturnType<typeof setTimeout> | number;
  typeRandom: ReturnType<typeof setTimeout> | number;
  tinyCode: ReturnType<typeof setTimeout> | number;
  crazyMusic: ReturnType<typeof setTimeout> | number;
  reverseLanguage: ReturnType<typeof setTimeout> | number;
  stealEye: ReturnType<typeof setTimeout> | number;
} = {
  screenBlock: 0,
  typeRandom: 0,
  tinyCode: 0,
  crazyMusic: 0,
  reverseLanguage: 0,
  stealEye: 0,
};

const reverseLanguage = (
  setCode: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
  gamePlayerCount: number
) => {
  setCode((code) => engToKor(code));
  dispatch({ type: GameItemType.REVERSELANGUAGE, act: "on" });
  timerID.reverseLanguage && clearTimeout(timerID.reverseLanguage);
  timerID.reverseLanguage = setTimeout(() => {
    setCode((code) => korToEng(code));
    dispatch({ type: GameItemType.REVERSELANGUAGE, act: "off" });
    timerID.reverseLanguage = 0;
  }, (1000 * 15) / Math.log2(gamePlayerCount));
};
```

타이머가 돌아가는지 체크하고 이미 돌아가면 타이머 초기화, 아니면 그냥 작동시킨다.
