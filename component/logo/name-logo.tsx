"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NameLogo = () => {
  const url = usePathname();
  const isRoot = useMemo(() => (url.startsWith("/home") ? true : false), [url]);
  return (
    <Link
      href="/"
      className={`fixed left-16 font-black text-3xl duration-500 bottom-[calc(100dvh-6rem)] ${
        isRoot ? "lg:bottom-36" : ""
      } `}
    >
      LEEGUTS
    </Link>
  );
};

export default NameLogo;
