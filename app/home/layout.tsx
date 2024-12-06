import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex w-full min-h-full justify-end items-center">
      {children}
    </main>
  );
};

export default HomeLayout;
