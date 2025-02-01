import { DetailDataType } from "../detail";
import Thumbnail from "@/assets/img/codeclash/main.png";

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
    duration: "2024.11 - 2024.12",
    fe_dev: ["이근성", "지현배"],
    be_dev: ["이동하", "현찬우"],
  },
  skills: {
    feSkills: ["React", "TypeScript", "Socket.io", "JWT"],
    beSkills: [
      "Nest.js",
      "Express",
      "TypeScript",
      "Socket.io",
      "Docker",
      "JWT",
    ],
  },
  contributions: [
    {
      title: "프론트엔드 개발",
      content: [
        {
          title: "React, TypeScript를 사용하여 UI 개발",
          id: "react",
        },
        {
          title: "Socket.io를 사용하여 실시간 통신 구현",
        },
        {
          title: "JWT를 사용하여 인증 구현",
        },
      ],
    },
    {
      title: "백엔드 개발",
      content: [
        {
          title: "Nest.js, Express를 사용하여 API 개발",
        },
        {
          title: "Socket.io를 사용하여 실시간 통신 구현",
        },
        {
          title: "Docker를 사용하여 배포 환경 구축",
        },
        {
          title: "JWT를 사용하여 인증 구현",
        },
      ],
    },
  ],
};
