import {
  SiDocker,
  SiMysql,
  SiNextdotjs,
  SiReactquery,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { DetailDataType } from "../detail";
import { FaAws } from "react-icons/fa";
import { GrOptimize } from "react-icons/gr";
import Thumbnail from "@/assets/img/aniwhere/main.webp";
import { MdWebAsset } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { SlLogin } from "react-icons/sl";

export const aniwhereData: DetailDataType = {
  id: "aniwhere",
  thumbnail: Thumbnail,
  mainExplanations: {
    simpleExplanation: "Aniwhere는 애니메이션 정보 제공 서비스 입니다.",
    detailExplanation: [
      "애니메이션을 보기 위해 새로운 정보를 찾는 것은 귀찮은 일입니다.",
      "저희는 애니메이션을 좋아하는 사람들이 애니메이션을 더 쉽게 즐길 수 있도록 애니메이션 정보 제공 서비스를 만들었습니다.",
      "Aniwhere는 애니메이션 정보 제공 서비스로, 사용자들이 애니메이션 정보를 쉽게 찾을 수 있도록 했습니다.",
      "사용자들이 애니메이션을 쉽게 찾을 수 있도록 태그 검색 기능을 추가했습니다.",
      "추천 알고리즘을 통해 사용자들이 좋아할 만한 애니메이션을 추천해줍니다.",
    ],
  },
  sideInfo: {
    github: "https://github.com/Project-aniwhere",
    duration: "2024.10 ~",
    fe_dev: ["이근성", "박종권", "홍유진"],
    be_dev: ["김운채", "권우현", "장우진"],
  },
  skills: {
    feSkills: [SiNextdotjs, SiTypescript, SiReactquery, SiTailwindcss],
    beSkills: [SiSpringboot, SiMysql, FaAws, SiDocker],
  },
  contributions: [
    {
      title: "성능 최적화",
      subtitle: "성능 최적화를 통한 사용자 경험 향상",
      Icon: GrOptimize,
      id: "optimize",
      content: [
        "AWS S3,CloudFront, Lambda@Edge를 사용한 이미지 최적화",
        "이미지 최적화 서버를 통한 이미지 용량 90% 감소",
        "서브셋 폰트를 통한 폰트 용량 90% 감소",
        "SSR 페이지를 SSG로 변경하여 과부하시 로딩속도 70% 감소",
      ],
    },
    {
      title: "로그인 기능 개발",
      subtitle: "next.js 환경에 맞춰 로그인 기능 개발",
      Icon: SlLogin,
      id: "login",
      content: [
        "Spring 과 Next.js 간 쿠키 공유 구현",
        "Next.js 소스코드 수정을 통해 인증 리다이렉션 구현",
      ],
    },
    {
      title: "공동 컴포넌트 개발",
      subtitle: "공동 컴포넌트 개발을 통한 개발 생산성 향상",
      Icon: FiUsers,
      content: [
        "캐러셀 컴포넌트 개발",
        "Intercept Route와 Parallel Route 기반 모달 페이지 개발",
        "카드 컴포넌트 개발",
      ],
    },
    {
      title: "메인/검색/인기/관리자 페이지 개발",
      subtitle: "기능 제공을 위한 페이지 개발",
      Icon: MdWebAsset,
      content: [
        "컴포넌트 기반 개발을 통한 재사용성 향상",
        "React-query를 무한 스크롤 구현",
        "SSE 기반 알림 기능 구현",
      ],
    },
  ],
};
