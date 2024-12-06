import FadeInOut from "@/component/effect/fade-in-out";
import { PropsWithChildren } from "react";

const DetailTemplate = ({ children }: PropsWithChildren) => {
  return (
    <FadeInOut className="relative flex flex-col items-center w-full">
      {children}
    </FadeInOut>
  );
};

export default DetailTemplate;
