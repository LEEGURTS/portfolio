import ModalRouter from "@/component/common/modal/modal-router";
import { DetailData } from "@/data/detail";
import { mdReader } from "@/data/md-reader";
import { mdxComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownModalPageProps {
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

const MarkdownModalPage = async ({ params }: MarkdownModalPageProps) => {
  const { targetId, contentId } = await params;
  const markdown = await mdReader(targetId, contentId);

  if (!markdown) return <div>Not Found</div>;

  return (
    <>
      <ModalRouter>
        <div className="prose max-w-full lg:max-w-[60rem] ">
          <MDXRemote source={markdown} components={mdxComponents} />
        </div>
      </ModalRouter>
    </>
  );
};

export default MarkdownModalPage;
