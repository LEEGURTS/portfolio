"use client";

import { DetailDataType } from "@/data/detail";
import { motion, Variants } from "motion/react";

interface DetailMainExplanationProps {
  detail: DetailDataType;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const DetailMainExplanation = ({ detail }: DetailMainExplanationProps) => {
  const { mainExplanations, url, duration, fe_dev, be_dev } = detail;
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
            .slice(0, 2)
            .map((sentence, idx) => (
              <p key={idx}>{sentence}</p>
            ))}
        </motion.div>
        <motion.div
          className="flex flex-col gap-4 lg:gap-8"
          variants={itemVariants}
        >
          {mainExplanations.detailExplanation.slice(2).map((sentence, idx) => (
            <p key={idx}>{sentence}</p>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="min-w-48 w-48 flex flex-col gap-4"
        variants={itemVariants}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default DetailMainExplanation;
