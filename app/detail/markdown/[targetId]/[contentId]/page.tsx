import ModalRouter from "@/component/common/modal/modal-router";
import { mdReader } from "@/data/md-reader";
import { mdxComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownPageProps {
  params: {
    targetId: string;
    contentId: string;
  };
}

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const markdown = await mdReader(params.targetId, params.contentId);

  return (
    <div className="prose max-w-full lg:max-w-[60rem] px-8 lg:px-16 pt-32 pb-48 ">
      <MDXRemote source={markdown} components={mdxComponents} />
    </div>
  );
};

export default MarkdownPage;
