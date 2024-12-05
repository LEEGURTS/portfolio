import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NameLogo from "@/component/logo/name-logo";
import Footer from "@/component/footer/footer";
import PageAnimatePresence from "@/component/effect/page-animate-presense";
import HomeIntroduce from "@/component/home/home-introduce";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const drukwide = localFont({
  src: "./fonts/DrukWideBold.woff",
  variable: "--font-drukwide",
});

export const metadata: Metadata = {
  title: "Leeguts",
  description: "Web for Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[12px] sm:text-[14px] lg:text-[16px]">
      <body
        className={`${pretendard.className} ${drukwide.variable} scroll-smooth p-4 w-full h-dvh scrollbar-none `}
      >
        <div
          className={`border-2 w-full h-full overflow-y-scroll scrollbar-none font-pretendard`}
          id="scroll-body"
        >
          <PageAnimatePresence>{children}</PageAnimatePresence>
        </div>
        <HomeIntroduce />
        <NameLogo />
        <Footer />
      </body>
    </html>
  );
}
