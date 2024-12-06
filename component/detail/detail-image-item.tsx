"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative flex-grow aspect-video object-cover"
      >
        <Image src={image} alt="" fill />
      </motion.div>
      <motion.div
        initial={{
          y: "20%",
          rotateY: 90,
        }}
        whileInView={{
          y: 0,
          rotateY: 0,
        }}
        transition={{
          y: {
            duration: 0,
          },
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 1 }}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
        }}
        className="relative flex flex-col gap-4 items-start w-48 "
      >
        <p className="font-semibold">{title}</p>
        {description.map((des, idx) => (
          <p className="text-sm" key={idx}>
            {des}
          </p>
        ))}
      </motion.div>
    </div>
  );
};

export default DetailImageItem;
