import HomeContentList from "@/component/home/home-content-list";
import { redirect } from "next/navigation";

interface HomeDataType {
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
];

const homePathData: Record<string, HomeDataType[]> = {
  "/": homeContent,
  "side-project": sideProjectContent,
};

export default function Home({ params }: { params: { title?: string[] } }) {
  if (params.title && params.title.length > 1) redirect("/home");
  const url = params.title ? params.title[0] : "/";
  return <HomeContentList contentList={homePathData[url]} />;
}
