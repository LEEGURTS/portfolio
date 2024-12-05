"use client";

import useTypeEffect from "@/hooks/effect/type-effect";
import FadeInOut from "../effect/fade-in-out";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AnimatePresence } from "motion/react";
const HomeIntroduce = () => {
  const pathName = usePathname();

  const isShow = useMemo(() => pathName.startsWith("/home"), [pathName]);

  const text = useTypeEffect({
    texts: [
      "안녕하세요. 프론트엔드 개발자 이근성입니다.",
      "누구나 이해하기 쉬운 코드를 추구합니다.",
      "뭐든지 직접 부딪혀보고 경험하려 합니다.",
      "끈질긴건 저 그 자체입니다.",
    ],
  });
  return (
    <AnimatePresence>
      {isShow && (
        <FadeInOut className="fixed text-xl font-semibold left-8 lg:left-16 top-16 lg:top-24 font-drukwide">
          {text}
          <span className="cursor w-0.5 border-r-2 animate-blink-caret" />
        </FadeInOut>
      )}
    </AnimatePresence>
  );
};

export default HomeIntroduce;
