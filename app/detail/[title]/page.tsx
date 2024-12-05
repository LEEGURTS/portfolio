import DetailHeader from "@/component/detail/detail-header";
import DetailImageList from "@/component/detail/detail-image-list";
import DetailMainExplanation from "@/component/detail/detail-main-explanation";
import { DetailData } from "@/data/detail";

const DetailPage = async ({ params }: { params: { title: string } }) => {
  const data = DetailData[params.title];
  return (
    <>
      <DetailHeader title={params.title} image={data.thumbnail} />
      <div className="w-full max-w-[90rem] px-8">
        <DetailMainExplanation detail={data} />
        <DetailImageList detail={data} />
      </div>
    </>
  );
};

export default DetailPage;
