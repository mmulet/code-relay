import { exec } from "child_process";

export function generateFiles() {
  return exec("node ./scripts/compiled/index.js");
}
