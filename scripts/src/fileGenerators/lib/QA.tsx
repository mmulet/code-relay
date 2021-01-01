import React, { FunctionComponent, ReactNode } from "react";
import CodeBox from "./CodeBox";

const QA: FunctionComponent<{
  readonly q: ReactNode;
}> = ({ children, q }) => (
  <CodeBox>
    <h2>Q: {q}</h2>
    <p>{children}</p>
  </CodeBox>
);

export default QA;
