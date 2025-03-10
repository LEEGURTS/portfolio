import { StaticImageData } from "next/image";
import { codeClashData } from "./detail-items/code-clash";
import { IconType } from "react-icons";
import { aniwhereData } from "./detail-items/aniwhere";
import { mkbportpolioData } from "./detail-items/mkb-portfolio";
import { tmaxCloudData } from "./detail-items/tmax-cloud";
import { korsearchData } from "./detail-items/korsearch";

export interface imageExplanationsType {
  image: StaticImageData;
  title: string;
  description: string[];
}

export interface ExplanationsType {
  simpleExplanation: string;
  detailExplanation: string[];
}

export interface SideInfoType {
  url?: string;
  github?: string;
  notion?: string;
  duration?: string;
  fe_dev?: string[];
  be_dev?: string[];
}

interface SkillsType {
  feSkills?: IconType[];
  beSkills?: IconType[];
}

export interface ContributionType {
  title: string;
  subtitle?: string;
  Icon?: IconType;
  content?: string[];
  id?: string;
}

export interface DetailDataType {
  id: string;
  thumbnail?: StaticImageData;
  mainExplanations: ExplanationsType;
  subExplanations?: ExplanationsType;
  skills?: SkillsType;
  sideInfo: SideInfoType;
  imageExplanations?: imageExplanationsType[];
  contributions?: ContributionType[];
  solvedProblem?: ContributionType[];
  moreDetail?: (() => JSX.Element)[];
  nextPage?: string;
}

export const DetailData: Record<string, DetailDataType> = {
  "code-clash": codeClashData,
  aniwhere: aniwhereData,
  korsearch: korsearchData,
  "mkb-portfolio": mkbportpolioData,
  "tmax-cloud": tmaxCloudData,
};
