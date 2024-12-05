"use client";

import { motion, HTMLMotionProps } from "motion/react";

interface FadeInOutProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}
const FadeInOut = ({ children, ...props }: FadeInOutProps) => (
  <motion.div
    {...props}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

export default FadeInOut;
