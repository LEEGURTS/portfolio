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

export interface DetailDataType {
  thumbnail: StaticImageData;
  mainExplanations: ExplanationsType;
  subExplanations?: ExplanationsType;
  url?: string;
  github?: string;
  notion?: string;
  duration?: string;
  fe_dev?: string[];
  be_dev?: string[];
  imageExplanations: imageExplanationsType[];
  moreDetail?: string[];
}

export const DetailData: Record<string, DetailDataType> = {
  "code-clash": codeClashData,
};
