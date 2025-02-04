import DetailContribution from "@/component/detail/detail-worked";
import DetailHeader from "@/component/detail/detail-header";
import DetailImageList from "@/component/detail/detail-image-list";
import DetailKeyword from "@/component/detail/detail-keyword";
import DetailMainExplanation from "@/component/detail/detail-main-explanation";
import { DetailData } from "@/data/detail";

export const generateStaticParams = async () => {
  return Object.keys(DetailData).map((title) => ({ title }));
};

const DetailPage = async ({
  params,
}: {
  params: Promise<{ title: string }>;
}) => {
  const { title } = await params;
  const data = DetailData[title];
  if (!data) return <div>Not Found</div>;

  return (
    <>
      <DetailHeader title={title} image={data.thumbnail} />
      <div className="w-full max-w-[90rem] px-8">
        <DetailMainExplanation
          mainExplanations={data.mainExplanations}
          sideInfo={data.sideInfo}
        />
        {data.skills && (
          <DetailKeyword
            feSkills={data.skills.feSkills}
            beSkills={data.skills.beSkills}
          />
        )}
        <DetailImageList imageExplanations={data.imageExplanations} />
        <DetailContribution
          title="Contribution"
          contributions={data.contributions}
          targetId={data.id}
        />
      </div>
      <div className="h-48"></div>
    </>
  );
};

export default DetailPage;
