import { resolve } from "path";
/**
 * Relative because it refers to ./compiled/fileGenerators in js
 * and ./src/fileGenerators in ts
 */
export const relativeFileGeneratorsDirectory = resolve(__dirname, `../`);
/**
 * src or Compiled depends if you are in js (with node)
 * or ts (with ts-node)
 */
export const srcOrCompiledDirectory = resolve(relativeFileGeneratorsDirectory, `../`);

export const scriptsDirectory = resolve(srcOrCompiledDirectory, `../`);

export const compiledDirectory = resolve(scriptsDirectory, `./compiled`)
export const srcDirectory = resolve(scriptsDirectory, `./src`)

/**
 * Relative because it refers to ./compiled/clientSide in js
 * and ./src/clientSide in ts
 */
export const compiledClientSideDirectory = resolve(compiledDirectory, `./clientSide`);


export const compiledFileGeneratorsDirectory = resolve(compiledDirectory, `./fileGenerators`);

export const codeExamplesDirectory = resolve(
  scriptsDirectory,
  `./codeExamples`
);

export const rootDirectory = resolve(scriptsDirectory, `../`);

export const publicDirectory = resolve(rootDirectory, "./public/");
