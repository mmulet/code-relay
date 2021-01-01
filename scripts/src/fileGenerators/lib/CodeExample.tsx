import React, {
  FunctionComponent,
} from "react";
import CodeBox from "./CodeBox";
import HighlightedCode, {
  Input,
} from "./HighlightedCode";

const CodeExample: FunctionComponent<Input> = ({
  children,
  ...input
}) => {
  return (
    <CodeBox>
      <HighlightedCode {...input} />
      {children}
    </CodeBox>
  );
};
export default CodeExample;
