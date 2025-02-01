import ModalRouter from "@/component/common/modal/modal-router";
import { mdReader } from "@/data/md-reader";
import { mdxComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MarkdownModalPageProps {
  params: {
    targetId: string;
    contentId: string;
  };
}

const MarkdownModalPage = async ({ params }: MarkdownModalPageProps) => {
  const markdown = await mdReader(params.targetId, params.contentId);

  return (
    <>
      <ModalRouter>
        <div className="prose">
          <MDXRemote source={markdown} components={mdxComponents} />
        </div>
      </ModalRouter>
    </>
  );
};

export default MarkdownModalPage;
