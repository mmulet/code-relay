import { publicDirectory } from "./directories";
import { sep } from "path";

export default (fileName: string) => `${publicDirectory}${sep}${fileName}`;
