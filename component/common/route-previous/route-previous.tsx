"use client";

import ArrowSVG from "@/assets/svg/arrow-svg";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface RoutePreviousProps {
  className?: string;
}

const RoutePrevious = ({ className }: RoutePreviousProps) => {
  const router = useRouter();
  const handleRoutePrevious = useCallback(() => router.back(), [router]);

  return (
    <button
      className={"z-50 scale-125 " + className}
      onClick={handleRoutePrevious}
    >
      <ArrowSVG />
    </button>
  );
};

export default RoutePrevious;
