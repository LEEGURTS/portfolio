import HomeContentList from "@/component/home/home-content-list";
import { homePathData } from "@/data/home";
import { redirect } from "next/navigation";

export default function Home({ params }: { params: { title?: string[] } }) {
  if (params.title && params.title.length > 1) redirect("/home");
  const url = params.title ? params.title[0] : "/";
  return <HomeContentList contentList={homePathData[url]} />;
}
