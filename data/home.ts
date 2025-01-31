export interface HomeDataType {
  href: string;
  title: string;
  subTitle?: string;
}

const homeContent: HomeDataType[] = [
  {
    href: "/detail/about-me",
    title: `ABOUT ME`,
    subTitle: `전체적인 저에 대한 소개입니다`,
  },
  {
    href: "/home/work-experience",
    title: `WORK\nEXPERIENCE`,
    subTitle: `저의 경력에 관한 내용입니다`,
  },
  {
    href: "/home/side-project",
    title: `SIDE\nPROJECT`,
    subTitle: `개인적으로 진행한 프로젝트입니다`,
  },
];

const sideProjectContent: HomeDataType[] = [
  {
    href: "/detail/aniwhere",
    title: `ANIWHERE`,
  },
  {
    href: "/detail/code-clash",
    title: `CODE\nCLASH`,
  },
  {
    href: "/detail/keyword-katch",
    title: `KEYWORD\nKATCH`,
  },
  {
    href: "/detail/mkb-portfolio",
    title: `MKB\nPORTFOLIO`,
  },
];

export const workExperienceContent: HomeDataType[] = [
  {
    href: "/detail/tmax-cloud",
    title: `TMAX\nCLOUD`,
    subTitle: `온북 클라우드 플랫폼 개발`,
  },
];

export const homePathData: Record<string, HomeDataType[]> = {
  "/": homeContent,
  "work-experience": workExperienceContent,
  "side-project": sideProjectContent,
};
