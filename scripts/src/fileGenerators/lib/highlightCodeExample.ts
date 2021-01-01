import Prism from "./Prism";
import { readFileSync } from "fs";
import { sep, extname } from "path";
import prettier from "prettier";
import { codeExamplesDirectory } from "./directories";

export interface Input {
  readonly codeExampleFileName: string;
  readonly addedLines?: Set<number>;
  readonly removedLines?: Set<number>;
  readonly prettier?: true | prettier.Options;
}

export default ({
  codeExampleFileName,
  addedLines,
  removedLines,
  prettier: prettierOptions,
}: Input) => {
  /**
   * Using the synchronous readFile function so
   * that this code will play nicely with React
   */
  const buffer = readFileSync(
    `${codeExamplesDirectory}${sep}${codeExampleFileName}`
  );
  const codeExample = buffer.toString();

  /**
   * get rid of the leading .
   */
  const extensionName = extname(codeExampleFileName).substr(1);

  const prettyCodeExample = !prettierOptions
    ? codeExample
    : prettier.format(codeExample, {
        parser: "babel",
        ...(typeof prettierOptions == "object" ? prettierOptions : {}),
      });

  return Prism.highlight(
    prettyCodeExample,
    Prism.languages[extensionName],
    extensionName
  )
    .split("\n")
    .map((line, index) =>
      addedLines?.has(index)
        ? `<span class="added">${line}</span>`
        : removedLines?.has(index)
        ? `<span class="removed">${line}</span>`
        : line
    )
    .join("\n");
};

if (require.main == module) {
  console.log(
    module.exports.default({
      codeExampleFileName: "quickExample2.jsx",
      addedLines: new Set([2]),
    })
  );
}
