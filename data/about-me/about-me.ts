import { FaAws, FaJava, FaReact } from "react-icons/fa";
import { PiFileC, PiFileCSharp } from "react-icons/pi";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGnubash,
  SiJavascript,
  SiKubernetes,
  SiMariadb,
  SiPython,
  SiReactquery,
  SiRedux,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import TmaxImage from "@/assets/img/about-me/logo/tmax-logo.png";
import BoostcampImage from "@/assets/img/about-me/logo/Boostcamp.png";
import ProfileImage from "@/assets/img/about-me/profile.webp";
import CodeClashImage from "@/assets/img/codeclash/main.png";
import GwangunImage from "@/assets/img/about-me/logo/kwangwoon-logo.png";

export const AboutMeData = {
  name: "이근성",
  profileImage: ProfileImage,
  introduce: {
    title: "반가워요.",
    boldTitle: "저는 근성 그 자체입니다 👋",
    subTitle: "뭐든지 시도해보는, 프론트엔드 개발자 이근성 입니다.",
    content: [
      "동료들과의 토론을 통해 문제를 해결하는 것을 좋아합니다.",
      " 코드 리뷰, 페어 프로그래밍을 통해 이슈를 해결하는 것 뿐만 아니라 더 나은 해결책을 얻음을 경험했습니다.",
      "새로운 환경에 던져져도 빠르게 적응하고 학습합니다.",
      "적응 능력을 바탕으로 관리자 페이지 개발, VPN 서버 개발, helm chart 작성 등 다양한 도메인에서 빠르게 적응했습니다.",
    ],
  },
  birth: "1999.07.05",
  email: "rmstjd333@gmail.com",
  github: "https://github.com/LEEGURTS",
  blog: "https://velog.io/@leeguts",
  skills: {
    bestSkills: [
      FaReact,
      RiNextjsFill,
      SiJavascript,
      SiTypescript,
      SiExpress,
      SiTailwindcss,
      SiReactquery,
      SiRedux,
    ],
    usableSkills: [FaJava, SiSpring, SiMariadb, SiPython, SiDocker, SiGnubash],
    experiencedSkills: [PiFileC, PiFileCSharp, SiFirebase, SiKubernetes, FaAws],
  },
  career: [
    {
      company: "티맥스 클라우드",
      position: "웹 풀스택 개발자",
      explain: "온북 사업부의 클라우드 서비스 개발",
      duration: "2024.06 ~ 2024.12",
      logo: TmaxImage,
      href: "/detail/tmax-cloud",
      roles: ["풀스택 개발", "Spring, React 개발"],
      acted: [
        {
          title: "TmaxGPMS 고도화",
          duration: "2024.10 ~ 2024.12",
          explain: "Electron 기반 리눅스 프로그램 윈도우 포팅, Helm Chart 배포",
        },
        {
          title: "구름GPMS 고도화",
          duration: "2024.06 ~ 2024.10",
          explain: "관리자 사용내역 로깅 고도화, GPMS 모듈 조작 API 개발",
        },
        {
          title: "TinuxVM 개발",
          duration: "2024.06 ~ 2024.10",
          explain: "VPN 서버 개발, 관리자 페이지 개발",
        },
      ],
    },
  ],
  activities: [
    {
      title: "부스트캠프",
      duration: "2023.07 ~ 2023.12",
      acted: [
        "CS 지식, React, JS 등 다양한 지식 학습",
        "페어프로그래밍, 코드리뷰 등 다양한 방법론 학습",
      ],
      logo: BoostcampImage,
      href: "/detail/boostcamp",
    },
  ],
  education: [
    {
      title: "광운대학교",
      duration: "2018.02 ~ 2024.08",
      explain: "소프트웨어학부 졸업",
      logo: GwangunImage,
      score: "4.26/4.5",
    },
  ],
  sideProjects: [
    {
      title: "Aniwhere",
      duration: "2024.10 ~",
      href: "/detail/aniwhere",
      details: [
        "AWS 기반 이미지 최적화",
        "SSR 페이지 부를 ISG 혹은 SSG로 변경해 성능 50% 개선",
        "Subset Font 도입을 통한 용량 90% 감소",
        "반응형 디자인 적용",
      ],
    },
    {
      title: "Code Clash",
      duration: "2023.11 ~ 2023.12",
      href: "/detail/code-clash",
      details: [
        "웹소켓 이벤트 리팩토링을 통한 책임 분리",
        "모나코 에디터를 통한 게임 기능 개발",
        "게임 아이템 구현",
        "JWT 토큰 관리 기능 개발",
      ],
      logo: CodeClashImage,
    },
    {
      title: "KorSearch",
      duration: "2023.07 ~ 2023.09",
      href: "/detail/korsearch",
      details: ["영문/한글 타이핑간 치환 기능 구현", "초성 검색 기능 구현"],
    },
    /*

    {
      title: "Keyword Katch",
      duration: "2023.03 ~ 2023.06",
      href: "/detail/keyword-katch",
      details: [
        "Debounce를 통한 검색 최적화",
        "SMTP 전송을 위한 html table 구현",
      ],
      logo: "",
    },
    */
    {
      title: "MKB 포트폴리오",
      duration: "2022.12 ~ 2023.02",
      href: "/detail/mkb-portfolio",
      details: [
        "애플 정책 우회를 통한 음량조절 기능 개발",
        "IndexedDB를 통한 음원 캐싱 기능 개발",
        "반응형 디자인 적용",
      ],
    },
  ],
};
