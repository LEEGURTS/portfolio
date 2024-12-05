import { DetailDataType } from "@/data/detail";

interface DetailMainExplanationProps {
  detail: DetailDataType;
}

const DetailMainExplanation = ({ detail }: DetailMainExplanationProps) => {
  const { mainExplanations, url, duration, fe_dev, be_dev } = detail;
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
      <div className="flex flex-col lg:flex-row gap-4 flex-grow">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">
            {mainExplanations.simpleExplanation}
          </p>
          <p>{mainExplanations.detailExplanation[0]}</p>
          <p>{mainExplanations.detailExplanation[1]}</p>
        </div>
        <div className="flex flex-col gap-4">
          {mainExplanations.detailExplanation.slice(2).map((sentence, idx) => (
            <p key={idx}>{sentence}</p>
          ))}
        </div>
      </div>
      <div className="min-w-48 w-48 flex flex-col gap-4">
        {url && (
          <a href={url} className="font-semibold">
            {url}
          </a>
        )}
        {duration && (
          <div>
            <p className="font-semibold">Duration</p>
            <p className="text-sm">{duration}</p>
          </div>
        )}
        {fe_dev && (
          <div>
            <p className="font-semibold">Front-end Developer</p>
            <p className="text-sm">{fe_dev.join(", ")}</p>
          </div>
        )}
        {be_dev && (
          <div>
            <p className="font-semibold">Back-end Developer</p>
            <p className="text-sm">{be_dev.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailMainExplanation;
