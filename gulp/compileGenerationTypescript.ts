import { exec } from "child_process";
import { generationSrcDirectory } from "./directories";

export function compileGenerationTypescript() {
  return exec(
    `npx tsc --project ${generationSrcDirectory}`
  );
}
