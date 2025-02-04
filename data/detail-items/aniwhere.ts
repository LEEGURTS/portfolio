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

export const aniwhereData: DetailDataType = {
  id: "aniwhere",
  thumbnail: Thumbnail,
  mainExplanations: {
    simpleExplanation: "Aniwhere는 애니메이션 정보 제공 서비스 입니다.",
    detailExplanation: [
      "애니메이션을 좋아하는 사람들은 애니메이션을 보기 위해 많은 시간을 투자합니다. 하지만 애니메이션을 보기 위해 많은 시간을 투자하는 것은 애니메이션을 좋아하는 사람들에게는 큰 즐거움이 될 수 있습니다.",
      "저희는 애니메이션을 좋아하는 사람들이 애니메이션을 더 쉽게 즐길 수 있도록 애니메이션 정보 제공 서비스를 만들었습니다.",
      "Aniwhere는 애니메이션 정보 제공 서비스로, 사용자들이 애니메이션 정보를 쉽게 찾을 수 있도록 했습니다.",
      "또한 사용자들이 애니메이션을 쉽게 찾을 수 있도록 검색 기능을 추가했습니다.",
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
  ],
};
