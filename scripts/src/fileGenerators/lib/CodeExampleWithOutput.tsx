import React, { FunctionComponent } from "react";
import { Input } from "./highlightCodeExample";
import CodeBox from "./CodeBox";
import HighlightedCode from "./HighlightedCode";
import HorizontalDivider from "./HorizontalDivider";
import CodeBoxColumn from "./CodeBoxColumn";
import { CodeBoxOutput } from "./CodeBoxOutput";

const CodeExampleWithOutput: FunctionComponent<Input> = (input) => {
  return (
    <CodeBox>
      <CodeBoxColumn>
        <HighlightedCode {...input} />
        <HorizontalDivider />
        <CodeBoxOutput>{input.children}</CodeBoxOutput>
      </CodeBoxColumn>
    </CodeBox>
  );
};

export default CodeExampleWithOutput;
