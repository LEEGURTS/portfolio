"use client";

import { motion } from "motion/react";
import Image from "next/image";
import MainImage from "@/assets/img/codeclash/main.png";

const DetailPage = ({ params }: { params: { title: string } }) => {
  return (
    <>
      <motion.div
        className="font-black text-[4rem] sm:text-[6rem] text-stroke-black text-transparent w-full max-w-screen-2xl text-end px-8 flex justify-end"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="w-fit font-drukwide whitespace-pre-wrap">
          {params.title.toUpperCase().split(" ").join("\n")}
        </motion.div>
      </motion.div>
      <Image
        src={MainImage}
        alt=""
        className="w-full h-[50dvh] object-cover -translate-y-16 -z-10"
      ></Image>
    </>
  );
};

export default DetailPage;
