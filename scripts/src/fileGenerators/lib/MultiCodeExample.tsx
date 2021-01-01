import React from "react";
import CodeBox from "./CodeBox";
import MultiHighlightCode, { Input } from "./MultiHighlightCode";

export default (input: Input) => {
  return (
    <CodeBox>
      <MultiHighlightCode {...input} />
    </CodeBox>
  );
};
