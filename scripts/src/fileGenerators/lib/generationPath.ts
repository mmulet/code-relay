import { docsDirectory } from "./directories";
import { sep } from "path";

export default (fileName: string) => `${docsDirectory}${sep}${fileName}`;
