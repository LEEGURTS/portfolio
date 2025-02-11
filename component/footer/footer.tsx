"use client";

import GithubSVG from "@/assets/svg/github-svg";
import InstagramSVG from "@/assets/svg/instagram-svg";
import MailSVG from "@/assets/svg/mail-svg";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import FadeInOut from "../effect/fade-in-out";
import useContainerScroll from "@/hooks/scroll/use-scroll";
import Link from "next/link";
const Footer = () => {
  const url = usePathname();
  const isRoot = useMemo(() => (url.startsWith("/home") ? true : false), [url]);
  const [isTextTransparent, setIsTransparent] = useState(false);
  const { scrollYProgress } = useContainerScroll();

  useEffect(() => {
    if (!isRoot && scrollYProgress && scrollYProgress !== 1)
      setIsTransparent(true);
    else setIsTransparent(false);
  }, [isRoot, scrollYProgress]);

  return (
    <AnimatePresence>
      {!isTextTransparent && (
        <FadeInOut className="fixed left-8 lg:left-16 bottom-8 lg:bottom-16">
          <p>프론트엔드 개발자, 이근성</p>
          <div className="flex flex-row gap-2">
            <Link href="https://github.com/LEEGURTS"><GithubSVG /></Link>
            <Link href="https://www.instagram.com/lee_guts/"><InstagramSVG /></Link>
            <Link href="mailto:rmstjd333@gmail.com"><MailSVG /></Link>
          </div>
        </FadeInOut>
      )}
    </AnimatePresence>
  );
};

export default Footer;
