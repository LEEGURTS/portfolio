import DetailContribution from "@/component/detail/detail-worked";
import DetailHeader from "@/component/detail/detail-header";
import DetailImageList from "@/component/detail/detail-image-list";
import DetailKeyword from "@/component/detail/detail-keyword";
import DetailMainExplanation from "@/component/detail/detail-main-explanation";
import { DetailData } from "@/data/detail";

const DetailPage = async ({ params }: { params: { title: string } }) => {
  const data = DetailData[params.title];

  if (!data) return <div>Not Found</div>;

  return (
    <>
      <DetailHeader title={params.title} image={data.thumbnail} />
      <div className="w-full max-w-[90rem] px-8">
        <DetailMainExplanation detail={data} />
        {data.skills && (
          <DetailKeyword
            feSkills={data.skills.feSkills}
            beSkills={data.skills.beSkills}
          />
        )}
        <DetailImageList detail={data} />
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
