import { DetailDataType } from "../detail";
import { FaGamepad, FaLock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrOptimize } from "react-icons/gr";
import { LuRouter } from "react-icons/lu";
import {
  SiDocker,
  SiExpress,
  SiJsonwebtokens,
  SiNestjs,
  SiReact,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";
import Thumbnail from "@/assets/img/codeclash/main.png";
import ArchitectureImage from "@/assets/img/codeclash/architecture.png";

export const codeClashData: DetailDataType = {
  id: "code-clash",
  thumbnail: Thumbnail,
  mainExplanations: {
    simpleExplanation: "Code Clash는 웹 기반 알고리즘 게임 서비스 입니다.",
    detailExplanation: [
      "코딩 테스트를 위해, 개인의 관심사에 의해, 심심풀이 등 여러한 목적으로 사람들은 알고리즘 문제를 풉니다. 하지만 알고리즘 문제를 단순히 풀기만 하면 지루하고 어렵기만 할 뿐입니다.",
      "저희는 평소 어려워하던 알고리즘 문제 학습에 대해 어떻게 쉽게 접근할까 고민하다가 쉽게, 혹은 재미있게 라는 키워드 중 재미있게 라는 키워드에 집중했습니다.",
      "Code Clash는 웹 기반 알고리즘 문제 게임 서비스로, 실시간으로 상대와 상호작용 하며 아이템을 사용해 시야를 가리거나, 글자를 헷갈리게 하는 등 여러 아이템을 통해 재미를 높였습니다.",
      "또한 게임 후 풀었던 문제의 기록, 풀이 등을 확인 하는 기능을 통해 재미와 학습, 두마리의 토끼를 모두 잡았습니다.",
    ],
  },
  sideInfo: {
    github: "https://github.com/boostcampwm2023/web06-CodeClash",
    duration: "2023.11 - 2023.12",
    fe_dev: ["이근성", "지현배"],
    be_dev: ["이동하", "현찬우"],
    url: "https://codeclash.duckdns.org",
  },
  skills: {
    feSkills: [SiReact, SiTypescript, SiSocketdotio, SiJsonwebtokens],
    beSkills: [
      SiNestjs,
      SiExpress,
      SiTypescript,
      SiSocketdotio,
      SiDocker,
      SiJsonwebtokens,
    ],
  },
  imageExplanations: [{
    image: ArchitectureImage,
    title: "Architecture",
    description: ["Codeclash의 아키텍쳐 입니다."]
  }],
  contributions: [
    {
      title: "인증 시스템 구현",
      subtitle: "JWT 기반의 인증 시스템 개발",
      Icon: FaLock,
      id: "auth",
      content: [
        "Axios Interceptor를 사용하여 JWT 토큰 관리",
        "자동 토큰 갱신 및 에러 처리 구현",
      ],
    },
    {
      title: "게임 플레이 기능",
      subtitle: "실시간 게임 플레이 기능 및 코드 에디터 커스텀",
      Icon: FaGamepad,
      id: "game",
      content: ["실시간 아이템 사용 기능 개발", "모나코 기반 코드 에디터 추가"],
    },
    {
      title: "사용자 경험 개선",
      subtitle: "직관적인 온보딩 프로세스 구현",
      Icon: FiUsers,
      content: ["온보딩 컴포넌트 구현", "초기 사용자 경험 최적화"],
    },
    {
      title: "소켓 통신 최적화",
      subtitle: "실시간 통신 구조 개선 및 버그 수정",
      Icon: SiSocketdotio,
      id: "socket",
      content: [
        "미니세미나, 페어 프로그래밍을 통한 소켓 이벤트 리팩토링",
        "방 입장 관련 버그 수정",
        "게임 시작 관련 버그 수정",
      ],
    },
    {
      title: "성능 최적화",
      subtitle: "이미지 최적화를 통한 성능 개선",
      Icon: GrOptimize,
      id: "image",
      content: ["Webp를 통한 이미지 최적화", "Dynamic Import를 통한 구조 개선"],
    },
    {
      title: "라우팅 보안",
      subtitle: "안전한 라우팅 시스템 구현",
      Icon: LuRouter,
      id: "routing",
      content: [
        "잘못된 라우팅 방지 컴포넌트 추가",
        "인증 기반 라우트 보호 구현",
      ],
    },
  ],
};
