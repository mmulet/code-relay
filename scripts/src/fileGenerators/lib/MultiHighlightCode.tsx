import React from "react";
import HighlightedCode from "./HighlightedCode";
import HorizontalDivider from "./HorizontalDivider";
export interface CodeExample {
  /**
   * Filename on disk
   */
  readonly fileName: string;
  /**
   * Filename shown in the webpage
   */
  readonly displayFileName: string;
}

export interface Input {
  readonly examples: CodeExample[];
}

export default ({ examples }: Input) => (
  <div>
    {examples.map(({ fileName, displayFileName }, index) => (
      <React.Fragment key={index}>
        {displayFileName}
        <HighlightedCode codeExampleFileName={fileName} />
        {index == examples.length - 1 ? null : (
          <HorizontalDivider />
        )}
      </React.Fragment>
    ))}
  </div>
);
