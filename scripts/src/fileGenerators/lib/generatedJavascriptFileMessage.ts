import { basename, extname } from "path";

export default (underScoreUnderScoreFilename: string) => `
/**
   * Hello! Here is the code un-minified so,
   * you can play around with it. 
   * 
   * To the Attention of Contributors:
   * This file is generated. Do not modify by hand.
   * Modify ./scripts/src/fileGenerators/${basename(
     underScoreUnderScoreFilename,
     extname(underScoreUnderScoreFilename)
   )}
   */ 
`;
