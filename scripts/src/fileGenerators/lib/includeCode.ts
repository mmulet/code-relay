import { resolve } from "path";
import { readFileSync } from "fs";
import { compiledClientSideDirectory } from "./directories";

export default (fileName: string) => `
//----Begin: ${fileName}.js
/**
 * To the Attention of Contributors:
 * This file is generated. Do not modify by hand. Modify ./scripts/src/clientSide/${fileName}.ts instead
 */ 
${readFileSync(
  resolve(compiledClientSideDirectory, `${fileName}.js`)
).toString()}

//----End: ${fileName}.js
`;
