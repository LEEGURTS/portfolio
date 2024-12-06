"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, Variants } from "motion/react";
import HomeContentItem from "./home-content-item";
import useContainerScroll from "@/hooks/scroll/use-scroll";

const textContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    perspective: "100vh",
    transformOrigin: "right center",
    transformStyle: "preserve-3d",
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.15,
    },
  },
};

interface HomeContentListProps {
  contentList: {
    href: string;
    title: string;
  }[];
}

const HomeContentList = ({ contentList }: HomeContentListProps) => {
  const { scrollY, scrollRef } = useContainerScroll();

  const [transAngle, setTransAngle] = useState(25);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const percent =
        current /
        ((scrollRef.current?.scrollHeight ?? 0) -
          (scrollRef.current?.clientHeight ?? 1));
      setTransAngle(25 + percent * 50);
    }
  });

  return (
    <motion.div
      className="relative text-right list-none flex flex-col justify-center overflow-clip"
      style={{
        perspectiveOrigin: `50% ${transAngle}%`,
        willChange: "transform",
      }}
      variants={textContainerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ type: "linear", duration: 0.25 }}
    >
      {contentList?.map(({ href, title }) => (
        <HomeContentItem key={href + title} href={href} title={title} />
      ))}
    </motion.div>
  );
};

export default HomeContentList;
