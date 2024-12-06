"use client";

import useContainerScroll from "@/hooks/scroll/use-scroll";
import { useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const NameLogo = () => {
  const url = usePathname();
  const isRoot = useMemo(() => (url.startsWith("/home") ? true : false), [url]);
  const [isTextTransparent, setIsTransparent] = useState(false);
  const { scrollY } = useContainerScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    if (!isRoot && current) setIsTransparent(true);
    else setIsTransparent(false);
  });

  return (
    <Link
      href="/"
      className={`fixed left-16 font-black text-3xl duration-500 bottom-[calc(100dvh-6rem)] ${
        isRoot ? "lg:bottom-36" : ""
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
