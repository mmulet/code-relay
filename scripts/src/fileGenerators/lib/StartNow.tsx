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
      Note: I'm still running everything myself, so I'm unavailable from 10p.m.
      to 9a.m . If you email during the off hours, I will get back to you, but
      not in 5 minutes like usual.
      <a href="https://www.timeanddate.com/time/zones/cdt">CDT</a>{" "}
    </CodeBox>
  </div>
);
