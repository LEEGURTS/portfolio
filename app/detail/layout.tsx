import RoutePrevious from "@/component/common/route-previous/route-previous";
import { PropsWithChildren } from "react";

const DetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <RoutePrevious className="fixed right-8 lg:right-12 top-8 lg:top-12" />
      {children}
    </>
  );
};

export default DetailLayout;
