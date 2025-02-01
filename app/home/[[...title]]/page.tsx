import HomeContentList from "@/component/home/home-content-list";
import { homePathData } from "@/data/home";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
  return Object.keys(homePathData).map((title) => ({
    params: { title: [title] },
  }));
};

export default async function Home({
  params,
}: {
  params: Promise<{ title?: string[] }>;
}) {
  const { title } = await params;
  if (title && title.length > 1) redirect("/home");
  const url = title ? title[0] : "/";
  return <HomeContentList contentList={homePathData[url]} />;
}
