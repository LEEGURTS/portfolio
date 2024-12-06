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

export interface DetailDataType {
  thumbnail: StaticImageData;
  mainExplanations: ExplanationsType;
  subExplanations?: ExplanationsType;
  sideInfo: SideInfoType;
  imageExplanations: imageExplanationsType[];
  moreDetail?: string[];
  nextPage?: string;
}

export const DetailData: Record<string, DetailDataType> = {
  "code-clash": codeClashData,
};
