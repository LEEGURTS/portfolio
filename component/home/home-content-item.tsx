import Link from "next/link";
import { motion, Variants } from "motion/react";

interface HomeContentItemProps {
  title: string;
  href: string;
  year?: number;
}
const textVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -45,
    scaleX: 1.2,
    translateY: 100,
  },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const HomeContentItem = ({ title, year, href }: HomeContentItemProps) => {
  return (
    <motion.div
      style={{
        transformOrigin: "right center",
        transformStyle: "preserve-3d",
      }}
      variants={textVariants}
      whileHover={{
        rotateY: -40,
      }}
    >
      <Link
        href={href}
        className="font-black font-drukwide text-[9.5vw] duration-500 justify-end whitespace-pre-wrap leading-none origin-right hover:text-white hover:text-stroke-black hover:text-transparent"
      >
        {year && <span className="text-lg text-">{year}</span>}
        <span>{title}</span>
      </Link>
    </motion.div>
  );
};

export default HomeContentItem;
