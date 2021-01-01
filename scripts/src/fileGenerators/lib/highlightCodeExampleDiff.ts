import highlightCodeExample, {
  Input as HighlightInput,
} from "./highlightCodeExample";
import { diffLines } from "diff";

export interface Input extends HighlightInput {
  readonly oldCodeExampleFileName: string;
}

export default ({ codeExampleFileName, oldCodeExampleFileName }: Input) => {
  const code = highlightCodeExample({
    codeExampleFileName,
  });
  const oldCode = highlightCodeExample({
    codeExampleFileName: oldCodeExampleFileName,
  });
  return diffLines(oldCode, code, {
      newlineIsToken: true,
  })
    .map(({ added, removed, value }) =>
      added
        ? `<span class="added">${value}</span>`
        : removed
        ? `<span class="removed">${value}</span>`
        : value
    )
    .join("");
};
