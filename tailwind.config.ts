import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        drukwide: ["var(--font-drukwide)"],
      },
      animation: {
        "blink-caret": "blink-caret 0.75s step-end infinite",
      },
      keyframes: {
        "blink-caret": {
          "0%, 100%": { "border-color": "transparent" },
          "50%": { "border-color": "black" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
