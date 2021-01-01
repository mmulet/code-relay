import React from "react";
import { FunctionComponent } from "react";

const CodeBoxColumn: FunctionComponent = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      justifyContent: "flex-start",
    }}
  >
    {" "}
    {children}
  </div>
);
export default CodeBoxColumn;
