import { StaticImageData } from "next/image";
import { codeClashData } from "./detail-items/code-clash";

interface imageExplanationsType {
  image: StaticImageData;
  title: string;
  description: string[];
}

interface ExplanationsType {
  simpleExplanation: string;
  detailExplanation: string[];
}

interface SideInfoType {
  url?: string;
  github?: string;
  notion?: string;
  duration?: string;
  fe_dev?: string[];
  be_dev?: string[];
}

interface SkillsType {
  feSkills?: string[];
  beSkills?: string[];
}

interface ContributionDetailType {
  title: string;
  id?: string;
}

export interface ContributionType {
  title: string;
  content: ContributionDetailType[];
}

export interface DetailDataType {
  id: string;
  thumbnail: StaticImageData;
  mainExplanations: ExplanationsType;
  subExplanations?: ExplanationsType;
  skills?: SkillsType;
  sideInfo: SideInfoType;
  imageExplanations?: imageExplanationsType[];
  contributions?: ContributionType[];
  solvedProblem?: ContributionType[];
  moreDetail?: string[];
  nextPage?: string;
}

export const DetailData: Record<string, DetailDataType> = {
  "code-clash": codeClashData,
};
