import React from "react";
import highlightCodeExample, {
  Input as HighlighInput,
} from "./highlightCodeExample";

export interface Input extends HighlighInput {
  readonly codeId?: string;
  readonly editable?: boolean;
}

export default (input: Input) => (
  <pre
    style={{
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      position: "relative",
    }}
  >
    <code
      id={input.codeId}
      contentEditable={input.editable}
      dangerouslySetInnerHTML={{
        /**
         * It's safe to do this because this code is only run on the server
         */
        __html: highlightCodeExample(input),
      }}
    ></code>
  </pre>
);
