import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex w-full min-h-dvh justify-end items-center">
      {children}
    </main>
  );
};

export default HomeLayout;
