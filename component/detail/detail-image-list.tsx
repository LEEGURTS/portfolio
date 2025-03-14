import { imageExplanationsType } from "@/data/detail";
import DetailImageItem from "./detail-image-item";

interface DetailMainExplanationProps {
  imageExplanations?: imageExplanationsType[];
}

const DetailImageList = ({ imageExplanations }: DetailMainExplanationProps) => {
  return (
    <div className="flex flex-col gap-8 lg:gap-32 my-8 lg:my-16">
      {imageExplanations?.map((exp, idx) => (
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
