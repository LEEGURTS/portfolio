"use client";

import GithubSVG from "@/assets/svg/github-svg";
import InstagramSVG from "@/assets/svg/instagram-svg";
import MailSVG from "@/assets/svg/mail-svg";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import FadeInOut from "../effect/fade-in-out";
const Footer = () => {
  const url = usePathname();
  const isRoot = useMemo(() => (url.startsWith("/home") ? true : false), [url]);

  return (
    <AnimatePresence>
      {isRoot && (
        <FadeInOut className="fixed left-8 lg:left-16 bottom-8 lg:bottom-16">
          <p>프론트엔드 개발자, 이근성</p>
          <div className="flex flex-row gap-2">
            <GithubSVG />
            <InstagramSVG />
            <MailSVG />
          </div>
        </FadeInOut>
      )}
    </AnimatePresence>
  );
};

export default Footer;