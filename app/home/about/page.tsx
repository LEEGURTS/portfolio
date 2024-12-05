import HomeContentList from "@/component/home/home-content-list";

const homeContent = [{ href: "/detail/test", title: `TEST` }];

export default function AboutPage() {
  return <HomeContentList contentList={homeContent} />;
}
