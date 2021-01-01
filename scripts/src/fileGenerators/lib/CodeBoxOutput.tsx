import React from "react";
import { FunctionComponent } from "react";

export const CodeBoxOutput: FunctionComponent = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "flex-start",
      paddingBottom: 15
    }}
  >
    <h2>Output:</h2>
    {children}
  </div>
);
