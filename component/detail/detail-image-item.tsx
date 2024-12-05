import Image, { StaticImageData } from "next/image";

interface DetailImageItemProps {
  image: StaticImageData;
  title: string;
  description: string[];
}

const DetailImageItem = ({
  image,
  title,
  description,
}: DetailImageItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 my-32">
      <div className="relative flex-grow aspect-video">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col gap-4 items-start w-48">
        <p className="font-semibold">{title}</p>
        {description.map((des, idx) => (
          <p className="text-sm" key={idx}>
            {des}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailImageItem;
