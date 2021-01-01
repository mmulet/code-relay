import React from "react";
import CodeBox from "./CodeBox";
import { gettingStartedLink } from "./links";

export default () => (
  <div
    style={{
      display: "flex",
      flexFlow: "row",
      justifyContent: "center",
    }}
  >
    <CodeBox>
      <a href={gettingStartedLink}>Start now!</a>
    </CodeBox>
  </div>
);
