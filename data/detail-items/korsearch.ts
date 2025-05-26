import { SiTypescript } from "react-icons/si";
import { DetailDataType } from "../detail";
import KorSearch from "@/component/korsearch/korsearch";
import { CgKeyboard } from "react-icons/cg";

export const korsearchData: DetailDataType = {
  id: "korsearch",
  mainExplanations: {
    simpleExplanation: "한글 자판 치환 라이브러리",
    detailExplanation: [
      "사람들은 간간히 한영키를 누르는 것을 잊곤 합니다.",
      "이를 방지하기 위해 한영 자판간에 치환을 해주는 라이브러리를 만들었습니다.",
      "간편하게 한영 변환없이 비교가 가능합니다.",
    ],
  },
  sideInfo: {
    github: "https://github.com/LEEGURTS/KorSearchTs",
    fe_dev: ["이근성"],
  },
  skills: {
    feSkills: [SiTypescript],
  },

  contributions: [
    {
      title: "한영 자판 치환함수 구현",
      Icon: CgKeyboard,
      content: [
        "한글 입력값을 영어로 분해하는 함수 구현",
        "영어 입력값을 한글로 합체하는 함수 구현",
      ],
      id: "unicode-analyze"
    },
  ],

  moreDetail: [KorSearch],
};
