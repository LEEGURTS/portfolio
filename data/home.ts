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
    href: "/detail/code-clash",
    title: `CODE\nCLASH`,
    subTitle: `온라인 알고리즘 게임 서비스`,
  },
  {
    href: "/detail/keyword-katch",
    title: `KEYWORD\nKATCH`,
    subTitle: `키워드 기반 뉴스제공 서비스`,
  },
];

export const homePathData: Record<string, HomeDataType[]> = {
  "/": homeContent,
  "side-project": sideProjectContent,
};
