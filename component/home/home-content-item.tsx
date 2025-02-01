import Link from "next/link";
import { motion, Variants } from "motion/react";

interface HomeContentItemProps {
  title: string;
  href: string;
  subTitle?: string;
  year?: number;
  className?: string;
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

const HomeContentItem = ({
  title,
  year,
  href,
  subTitle,
  className,
}: HomeContentItemProps) => {
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
      className={className}
    >
      <Link
        href={href}
        className="font-black font-drukwide text-[9.5vw] duration-500 justify-end whitespace-pre-wrap leading-none origin-right "
      >
        {year && <p className="text-lg">{year}</p>}
        <p className="duration-500 hover:text-white hover:text-stroke-black hover:text-transparent">
          {title}
        </p>
        {subTitle && (
          <p className="font-semibold lg:font-bold text-xl sm:text-2xl lg:text-3xl">
            {subTitle}
          </p>
        )}
      </Link>
    </motion.div>
  );
};

export default HomeContentItem;
