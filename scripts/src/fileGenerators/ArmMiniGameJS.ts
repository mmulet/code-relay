import { readFileSync } from "fs";
import { resolve } from "path";
import { compiledClientSideDirectory } from "./lib/directories";
import FileGenerator from "./lib/FileGenerator";
import { armMiniGameJS } from "./lib/fileNames";
import generatedJavascriptFileMessage from "./lib/generatedJavascriptFileMessage";

export const fileName = "animation.js";
export const fileType = "js";

const grabCode = (fileName: string) =>
  readFileSync(
    resolve(compiledClientSideDirectory, `${fileName}.js`)
  ).toString();

const output: FileGenerator = {
  fileType: "content",

  fileName: armMiniGameJS,

  content: `"use strict";

  ${generatedJavascriptFileMessage(__filename)}

  ${grabCode("nextArmGrowthState")}
  ${grabCode("guy3")}
  ${grabCode("animatedCharacters")}
  ${grabCode("makeAnimationCanvas")}
  const guy1 = null;
  ${grabCode("batonState")}

  ${grabCode("ArmMiniGame")}

  `,
};

export default output;
