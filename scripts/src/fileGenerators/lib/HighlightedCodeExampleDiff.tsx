import React from "react";
import highlightCodeExampleDiff, { Input } from "./highlightCodeExampleDiff";
export default (input: Input) => (
  <pre
    style={{
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}
  >
    <code
      dangerouslySetInnerHTML={{
        /**
         * It's safe to do this because this code is 
         * only run on the server
         */
        __html: highlightCodeExampleDiff(input),
      }}
    ></code>
  </pre>
);
