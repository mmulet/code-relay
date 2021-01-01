import { readFileSync } from "fs";
import { resolve } from "path";
import { compiledClientSideDirectory } from "./directories";
/**
 * @TODO provide actual link to source code
 */
export default (fileName: string) =>
  `<script>
  /**
   * Hello! Here is the code un-minified so,
   * you can play around with it. 
   * If you actually want to contribute,
   * the Typescript source code with comments
   * is available here:
   */ 
  ${readFileSync(
    resolve(compiledClientSideDirectory, `./${fileName}.js`)
  ).toString()}</script>`;
