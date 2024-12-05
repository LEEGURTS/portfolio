"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import FrozenRoute from "./frozen-route";

const PageAnimatePresence = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {/**
       * We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
       * The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
       * During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
       */}
      <motion.div
        key={process.env.NODE_ENV === "development" ? Math.random() : pathname}
      >
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence;
