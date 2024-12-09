export interface HomeDataType {
  href: string;
  title: string;
}

const homeContent: HomeDataType[] = [
  { href: "/detail/about", title: `ABOUT ME` },
  { href: "/home/work-experience", title: `WORK\nEXPERIENCE` },
  { href: "/home/side-project", title: `SIDE\nPROJECT` },
];

const sideProjectContent: HomeDataType[] = [
  { href: "/detail/code-clash", title: `CODE\nCLASH` },
  { href: "/detail/keyword-katch", title: `KEYWORD\nKATCH` },
];

export const homePathData: Record<string, HomeDataType[]> = {
  "/": homeContent,
  "side-project": sideProjectContent,
};
