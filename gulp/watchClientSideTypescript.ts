import { exec } from "child_process";
import { clientSideSrcDirectory } from "./directories";

export function watchClientSideTypescript() {
  /**
   * Seems to be about 6 times faster to
   * watch the typescript with tsc and then watch the javascript
   * than to use gulp-typescript. Maybe I had it configured wrong?
   */
  return exec(`npx tsc --watch --project ${clientSideSrcDirectory}`);
}
