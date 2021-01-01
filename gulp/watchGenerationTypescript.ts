import { exec } from "child_process";
import { generationSrcDirectory } from "./directories";

export function watchGenerationTypescript() {
  /**
   * Seems to be about 6 times faster to
   * watch the typescript with tsc and then watch the javascript
   * than to use gulp-typescript. Maybe I had it configured wrong?
   */
  return exec(`npx tsc --watch --project ${generationSrcDirectory}`);
}
