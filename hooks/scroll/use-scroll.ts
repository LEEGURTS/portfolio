"use client";

import { useEffect, useRef, useState } from "react";

const listeners = new Set<(scrollY: number, scrollYProgress: number) => void>();

if (typeof window !== "undefined") {
  const scrollBody = document.body.querySelector(
    "#scroll-body"
  ) as HTMLDivElement;
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollBody;
    const scrollY = scrollTop;
    const scrollYProgress = scrollTop / (scrollHeight - clientHeight);

    listeners.forEach((callback) => callback(scrollY, scrollYProgress));
  };

  scrollBody?.addEventListener("scroll", handleScroll);
}

const useContainerScroll = () => {
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateScroll = (y: number, progress: number) => {
      setScrollY(y);
      setScrollYProgress(progress);
    };

    listeners.add(updateScroll);

    return () => {
      listeners.delete(updateScroll);
    };
  }, []);

  return { scrollYProgress, scrollY, scrollRef };
};

export default useContainerScroll;
