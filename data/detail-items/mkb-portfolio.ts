import {
  SiFirebase,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { DetailDataType } from "../detail";
import Thumbnail from "@/assets/img/mkb-portfolio/main.webp";
import { CiMobile3, CiMusicNote1, CiServer } from "react-icons/ci";

export const mkbportpolioData: DetailDataType = {
  id: "mkb-portfolio",
  thumbnail: Thumbnail,
  mainExplanations: {
    simpleExplanation: "음악가 지인의 포트폴리오 사이트 입니다.",
    detailExplanation: [
      "음악가 지인의 포트폴리오 사이트로, 음악가 지인이 자신의 음악을 소개하고 연락 수단을 제공하는 사이트입니다.",
      "음악가 지인의 음악을 들을 수 있고, 이메일을 통해 음악가 지인과 소통할 수 있습니다.",
      "여러 기기에서 반응형으로 제공되며, 모바일에서도 편리하게 이용할 수 있습니다.",
      "자체 음원 플레이어를 통해 편리하게 음악을 들을 수 있습니다.",
      "현재는 사용중이지 않아 다른 음원으로 대체되었습니다.",
    ],
  },
  sideInfo: {
    github: "https://github.com/LEEGURTS/MKBNEWWEB",
    duration: "2022.12 ~ 2023.01",
    fe_dev: ["이근성"],
    be_dev: ["이근성"],
  },
  skills: {
    feSkills: [SiReact, SiTypescript, SiTailwindcss],
    beSkills: [SiFirebase],
  },
  contributions: [
    {
      title: "Firebase 기반 백엔드 구축",
      Icon: CiServer,
      content: ["Firebase 음원 저장", "Firebase 음원 기반 음원 플레이어 개발"],
    },
    {
      title: "반응형 웹 디자인",
      Icon: CiMobile3,
      content: [
        "모바일, 데스크탑, 태블릿에서의 반응형 웹 개발",
        "해상도에 따른 동작 및 디자인 변경",
      ],
    },
    {
      title: "음악 플레이어 개발",
      id: "music-player",
      Icon: CiMusicNote1,
      content: [
        "IndexedDB를 사용한 음원 캐싱",
        "Gain Node 기반 정책 상관 없이 음량 조절",
        "Firebase 데이터 기반 목록 생성/재생",
      ],
    },
  ],
};
