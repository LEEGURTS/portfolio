import { DetailDataType } from "../detail";
import Thumbnail from "@/assets/img/codeclash/main.png";
import LoginGif from "@/assets/img/codeclash/login.gif";
import ChatGif from "@/assets/img/codeclash/chat.gif";
import EnterRoomGif from "@/assets/img/codeclash/enter-room.gif";
import GetItemGif from "@/assets/img/codeclash/get-item.gif";
import GetResultGif from "@/assets/img/codeclash/get-result.gif";
import IntroduceGif from "@/assets/img/codeclash/introduce.gif";

export const codeClashData: DetailDataType = {
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
    duration: "2024.11 - 2024.12",
    fe_dev: ["이근성", "지현배"],
    be_dev: ["이동하", "김찬우"],
  },
  imageExplanations: [
    {
      image: LoginGif,
      title: "로그인",
      description: [
        "처음 접속시에 만나 볼 수 있는 로그인 페이지 입니다. JWT를 통해 인증/인가를 처리하고 있습니다.",
        "미니멀한 디자인, 게임 스타트 키를 통해 신나는 게임의 분위기를 느낄 수 있습니다.",
      ],
    },
    {
      image: EnterRoomGif,
      title: "로비 접속",
      description: ["로비를 통해 여러 게임에 원하는대로 접속 할 수 있습니다."],
    },
    {
      image: ChatGif,
      title: "채팅",
      description: [
        "로비에서 여러 사람들과 소통을 나눌 수 있습니다.",
        "게임 시작 전 가벼운 담소를 나눌 수 있습니다.",
      ],
    },
    {
      image: IntroduceGif,
      title: "가이드",
      description: [
        "처음 게임을 접하는 사람도 쉽게 접하도록 가이드를 제공합니다.",
      ],
    },
    {
      image: GetItemGif,
      title: "게임 아이템",
      description: [
        "여러 게임 아이템을 통해 알고리즘 문제 풀이에 재미를 느낄 수 있습니다.",
        "화면 가리기, 줄 바꾸기, 언어 바꾸기 등 여러 아이템으로 상대와 대전할 수 있습니다.",
      ],
    },
    {
      image: GetResultGif,
      title: "결과 확인",
      description: [
        "순위를 확인하고 다른 사람의 풀이를 확인 할 수 있습니다.",
        "게임 결과를 확인하며 풀었던 문제에 대한 복습도 가능합니다.",
      ],
    },
  ],
};
