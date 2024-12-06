import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";

const useContainerScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
    layoutEffect: false,
  });

  useEffect(() => {
    const scrollBody = document.body.querySelector(
      "#scroll-body"
    ) as HTMLDivElement;
    scrollRef.current = scrollBody;
  });

  return { scrollRef, scrollY, scrollYProgress };
};

export default useContainerScroll;
