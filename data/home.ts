export interface HomeDataType {
  href: string;
  title: string;
  subTitle?: string;
}

const homeContent: HomeDataType[] = [
  {
    href: "/detail/about-me",
    title: `ABOUT ME`,
  },
  {
    href: "/home/work-experience",
    title: `WORK\nEXPERIENCE`,
  },
  {
    href: "/home/side-project",
    title: `SIDE\nPROJECT`,
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
    href: "/detail/korsearch",
    title: `KORSEARCH`,
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
