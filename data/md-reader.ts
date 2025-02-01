"use server";

import path from "path";
import fs from "fs";

export const mdReader = async (target: string, mdName: string) => {
  if (mdName.includes("..")) {
    return "";
  }
  const filePath = path.join(
    process.cwd(),
    `data/markdown/${target}/${mdName}.md`
  );

  if (!fs.existsSync(filePath)) {
    return "";
  }

  const markdown = fs.readFileSync(filePath, "utf-8");
  return markdown;
};
