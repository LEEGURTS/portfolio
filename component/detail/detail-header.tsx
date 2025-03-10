import Image, { StaticImageData } from "next/image";
import * as motion from "motion/react-client";
import ArrowSVG from "@/assets/svg/arrow-svg";
interface DetailHeaderProps {
  title: string;
  image?: StaticImageData;
}

const DetailHeader = ({ title, image }: DetailHeaderProps) => {
  return (
    <div className="relative w-full h-dvh flex flex-col justify-center items-center">
      <motion.div
        className="font-black text-[4rem] sm:text-[6rem] text-stroke-black text-transparent w-full max-w-screen-2xl text-end px-8 flex justify-end leading-none"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-fit font-drukwide whitespace-pre-wrap break-all">
          {title.toUpperCase().split("-").join("\n")}
        </div>
      </motion.div>
      {image ? (
        <Image
          src={image}
          alt=""
          className="w-full h-[50dvh] object-cover -translate-y-16 -z-10"
        ></Image>
      ) : (
        <motion.div
          animate={{
            y: [0, 30],
          }}
          transition={{
            type: "spring",
            visualDuration: 0.5,
            bounce: 0.25,
            repeat: Infinity,
          }}
        >
          <ArrowSVG rotate={270} />
          <div className="-translate-y-2">
            <ArrowSVG rotate={270} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DetailHeader;
