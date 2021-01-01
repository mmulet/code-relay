import React from "react";
import CodeBox from "./CodeBox";
import { maintainerLink } from "./links";

export default () => (
  <CodeBox>
    <h3>Are you an open source maintainer?</h3>
    <p>
      Submit new tasks and make your life 1000x better
      <div style={{
        minWidth: "100%",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center"
      }}>
        <a href={maintainerLink}>Learn more</a>
      </div>
    </p>
  </CodeBox>
);
