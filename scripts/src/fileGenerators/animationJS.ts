import { readFileSync } from "fs";
import { resolve } from "path";
import { compiledClientSideDirectory } from "./lib/directories";
import FileGenerator from "./lib/FileGenerator";
import { animationJS } from "./lib/fileNames";
import generatedJavascriptFileMessage from "./lib/generatedJavascriptFileMessage";

export const fileName = "animation.js";
export const fileType = "js";

/**
 * @TODO provide actual link to source code
 */

const grabCode = (fileName: string) =>
  readFileSync(
    resolve(compiledClientSideDirectory, `${fileName}.js`)
  ).toString();

const output: FileGenerator = {
  fileType: "content",

  fileName: animationJS,

  content: `"use strict";

  ${generatedJavascriptFileMessage(__filename)}
  ${grabCode("nextArmGrowthState")}
  ${grabCode("guy1")}
  ${grabCode("guy2")}
  ${grabCode("guy3")}
  ${grabCode("guy4")}
  ${grabCode("guy5")}
  ${grabCode("guy6Crowd")}
  ${grabCode("guy6")}
  ${grabCode("batonState")}
  ${grabCode("animatedCharacters")}
  ${grabCode("snowFlakes")}
  
  ${grabCode("animationDirector")}
  ${grabCode("makeAnimationCanvas")}
  ${grabCode("FullScreenAnimation")}
  `,
};

export default output;
