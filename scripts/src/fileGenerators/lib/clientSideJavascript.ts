import { readFileSync } from "fs";
import { resolve } from "path";
import { compiledClientSideDirectory } from "./directories";

export default (fileName: string) =>
  `<script>
  /**
   * Hello! Here is the code un-minified so,
   * you can play around with it. 
   * If you actually want to contribute,
   * the Typescript source code with comments
   * is available here:
   * https://github.com/mmulet/code-relay
   */ 
  ${readFileSync(
    resolve(compiledClientSideDirectory, `./${fileName}.js`)
  ).toString()}</script>`;
