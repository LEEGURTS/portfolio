import HomeContentList from "@/component/home/home-content-list";

const homeContent = [
  { href: "/home/about", title: `ABOUT ME` },
  { href: "/home/project/work", title: `WORK\nEXPERIENCE` },
  { href: "/home/project/study", title: `SIDE\nPROJECT` },
];

export default function Home() {
  return <HomeContentList contentList={homeContent} />;
}
