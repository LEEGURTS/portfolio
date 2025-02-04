import { containerVariants, itemVariants } from "@/constants/motion-variants";
import { ExplanationsType, SideInfoType } from "@/data/detail";
import * as motion from "motion/react-client";
import Link from "next/link";

interface DetailMainExplanationProps {
  mainExplanations: ExplanationsType;
  sideInfo: SideInfoType;
}

const DetailMainExplanation = ({
  mainExplanations,
  sideInfo,
}: DetailMainExplanationProps) => {
  const { url, duration, fe_dev, be_dev, github, notion } = sideInfo;

  return (
    <motion.div
      className="flex flex-col sm:flex-row w-full justify-between gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col lg:flex-row gap-4 flex-grow">
        <motion.div
          className="flex flex-col gap-4 lg:gap-8"
          variants={itemVariants}
        >
          <p className="font-bold text-xl">
            {mainExplanations.simpleExplanation}
          </p>
          {mainExplanations.detailExplanation
            .slice(0, Math.floor(mainExplanations.detailExplanation.length / 2))
            .map((sentence, idx) => (
              <p key={idx}>{sentence}</p>
            ))}
        </motion.div>
        <motion.div
          className="flex flex-col gap-4 lg:gap-8"
          variants={itemVariants}
        >
          {mainExplanations.detailExplanation
            .slice(Math.floor(mainExplanations.detailExplanation.length / 2))
            .map((sentence, idx) => (
              <p key={idx}>{sentence}</p>
            ))}
        </motion.div>
      </div>
      <motion.div
        className="min-w-48 w-48 flex flex-col gap-4"
        variants={itemVariants}
      >
        {url && (
          <div>
            <p className="font-semibold">Site URL</p>
            <Link href={url} className="text-sm" target="_blank">
              {url}
            </Link>
          </div>
        )}
        {github && (
          <div>
            <p className="font-semibold">Github</p>
            <Link href={github} className="text-sm break-words" target="_blank">
              {github}
            </Link>
          </div>
        )}
        {notion && (
          <div>
            <p className="font-semibold">Notion</p>
            <Link href={notion} className="text-sm" target="_blank">
              {notion}
            </Link>
          </div>
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
      </motion.div>
    </motion.div>
  );
};

export default DetailMainExplanation;
