import { resolve } from "path";

export const rootDirectory =  resolve(__dirname, "../")
export const scriptsDirectory = resolve(rootDirectory, "./scripts")

export const compiledDirectory = resolve(scriptsDirectory, "./compiled");

export const srcDirectory = resolve(scriptsDirectory, "./src");

export const clientSideSrcDirectory = resolve(srcDirectory, "./clientSide");
export const generationSrcDirectory = resolve(srcDirectory, "./fileGenerators");
