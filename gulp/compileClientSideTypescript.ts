import { exec } from "child_process";
import { clientSideSrcDirectory } from "./directories";

export function compileClientSideTypescript() {
  return exec(
    `npx tsc --project ${clientSideSrcDirectory}`
  );
}
