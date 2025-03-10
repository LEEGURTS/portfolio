"use client";

import { useState } from "react";
import { engToKor, korToEng } from "korsearch";

const KorSearch = () => {
  const [language, setLanguage] = useState<"kor" | "eng">("kor");
  const [input, setInput] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-16">
        <p className="font-bold text-xl">한글 자판 치환 라이브러리</p>
        <div className="flex items-center gap-4">
          <p className="text-gray-500 text-sm">현재 치환 언어: </p>
          <button
            className="text-sm font-bold bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setLanguage(language === "kor" ? "eng" : "kor")}
          >
            {language === "kor" ? "한글" : "영어"}
          </button>
        </div>
      </div>
      <textarea
        className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg"
        value={input}
        onChange={onChange}
        placeholder="직접 타이핑해보세요!"
      />
      <div className="flex flex-col gap-4">
        <p className="font-bold text-xl">결과</p>
        <p className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg">
          {language === "kor" ? engToKor(input) : korToEng(input)}
        </p>
      </div>
    </div>
  );
};

export default KorSearch;
