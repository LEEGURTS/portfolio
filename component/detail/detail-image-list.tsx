import { DetailDataType } from "@/data/detail";
import DetailImageItem from "./detail-image-item";

interface DetailMainExplanationProps {
  detail: DetailDataType;
}

const DetailImageList = ({ detail }: DetailMainExplanationProps) => {
  const { imageExplanations } = detail;
  return (
    <div className="flex flex-col gap-8 lg:gap-32">
      {imageExplanations.map((exp, idx) => (
        <DetailImageItem
          key={idx}
          image={exp.image}
          title={exp.title}
          description={exp.description}
        />
      ))}
    </div>
  );
};

export default DetailImageList;
