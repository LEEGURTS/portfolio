"use client";

import useContainerScroll from "@/hooks/scroll/use-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const NameLogo = () => {
  const url = usePathname();
  const isRoot = useMemo(() => (url.startsWith("/home") ? true : false), [url]);
  const [isTextTransparent, setIsTransparent] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const { scrollYProgress } = useContainerScroll();

  useEffect(() => {
    if (!isRoot && scrollYProgress && scrollYProgress !== 1)
      setIsTransparent(true);
    else setIsTransparent(false);

    if (scrollYProgress == 1) setIsScrollBottom(true);
    else setIsScrollBottom(false);
  }, [isRoot, scrollYProgress]);

  return (
    <Link
      href="/"
      className={`fixed left-8 lg:left-16 font-black text-3xl duration-500 ${
        isRoot
          ? "bottom-28 lg:bottom-36"
          : isScrollBottom
          ? "bottom-28 lg:bottom-36"
          : "bottom-[calc(100dvh-4rem)] lg:bottom-[calc(100dvh-6rem)]"
      } ${
        isTextTransparent
          ? "text-transparent text-stroke-thin opacity-40"
          : "text-black"
      }`}
    >
      LEEGUTS
    </Link>
  );
};

export default NameLogo;
