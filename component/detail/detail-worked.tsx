"use client";
import { motion } from "motion/react";
import { ContributionType } from "@/data/detail";
import { containerVariants } from "@/constants/motion-variants";
import DetailWorkedItem from "./detail-worked-item";

interface DetailContributionProps {
  targetId: string;
  title: string;
  contributions?: ContributionType[];
}

const DetailContribution = ({
  targetId,
  title,
  contributions,
}: DetailContributionProps) => {
  return (
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="flex flex-col gap-2 mb-8 lg:mb-16">
        {contributions?.map((contribution, idx) => (
          <DetailWorkedItem
            key={idx}
            targetId={targetId}
            contribution={contribution}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DetailContribution;
