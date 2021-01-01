import React from "react";
import CodeBox from "./CodeBox";

export default () => (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
    }}
  >
    <CodeBox>Maintainer: Creates a task</CodeBox>
    <div
      style={{
        fontSize: 30,
      }}
    >
      ↓
    </div>

    <CodeBox>You:</CodeBox>
    <div
      style={{
        fontSize: 30,
      }}
    >
      ↓
    </div>
    <CodeBox>You:</CodeBox>

    <div
      style={{
        display: "flex",
        flexFlow: "row",
        fontSize: 30,
      }}
    >
      <div>↙</div>
      <div
        style={{
          minWidth: 10,
        }}
      ></div>
      <div>↘</div>
    </div>
    <div
      style={{
        display: "flex",
        flexFlow: "row",
      }}
    >
      <CodeBox>You:</CodeBox>
      <div
        style={{
          minWidth: 10,
        }}
      ></div>
      <CodeBox>You:</CodeBox>
    </div>
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        fontSize: 30,
      }}
    >
      <div>↘</div>
      <div
        style={{
          minWidth: 10,
        }}
      ></div>
      <div>↙</div>
    </div>
    <CodeBox>You:</CodeBox>
  </div>
);
