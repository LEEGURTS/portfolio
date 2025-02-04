import { DetailData } from "@/data/detail";
import { mdReader } from "@/data/md-reader";
import { mdxComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownPageProps {
  params: Promise<{
    targetId: string;
    contentId: string;
  }>;
}

export const generateStaticParams = async () => {
  return Object.keys(DetailData).flatMap((title) => {
    const targetId = DetailData[title].id;

    return [
      ...(DetailData[title].contributions?.map((contribution) => ({
        targetId,
        contentId: contribution.id,
      })) ?? []),
      ...(DetailData[title].solvedProblem?.map((contribution) => ({
        targetId,
        contentId: contribution.id,
      })) ?? []),
    ];
  });
};

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const { targetId, contentId } = await params;
  const markdown = await mdReader(targetId, contentId);

  if (!markdown) return <div>Not Found</div>;

  return (
    <div className="prose max-w-full lg:max-w-[60rem] px-8 lg:px-16 pt-32 pb-48 ">
      <MDXRemote source={markdown} components={mdxComponents} />
    </div>
  );
};

export default MarkdownPage;
