import React, { FunctionComponent } from "react";
import CodeBox from "./CodeBox";
import { CodeBoxOutput } from "./CodeBoxOutput";
import CodeBoxColumn from "./CodeBoxColumn";
import HorizontalDivider from "./HorizontalDivider";
import MultiHighlightCode, { Input } from "./MultiHighlightCode";

const DualCodeExampleWithOutput: FunctionComponent<Input> = ({
  examples,
  children,
}) => (
  <CodeBox>
    <CodeBoxColumn>
      <MultiHighlightCode
        {...{
          examples,
        }}
      />
      <HorizontalDivider />
      <CodeBoxOutput>{children}</CodeBoxOutput>
    </CodeBoxColumn>
  </CodeBox>
);

export default DualCodeExampleWithOutput;
