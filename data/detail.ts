import { StaticImageData } from "next/image";

interface imageExplanationsType {
  image: StaticImageData;
  title: string;
  description: string;
}

export interface DetailDataType {
  title: string;
  thumbnail: StaticImageData;
  simpleExplanation: string;
  detailExplanation: string;
  url?: string;
  duration?: string;
  fe_dev: string[];
  be_dev: string[];
  imageExplanations: imageExplanationsType;
  moreDetail: string;
}

export const DetailData: Record<string, DetailDataType> = {};
