import React from "react";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import Page from "./lib/Page";
import { fontemonTest } from "./lib/fileNames";
import clientSideJavascript from "./lib/clientSideJavascript";

export const javascript = clientSideJavascript("fontemonTest");


const output: FileGenerator = {
  fileType: "html",
  fileName: fontemonTest,
  title: "code relay - FontemonTestPage",
  head: `
  <style>
  ${commonCSS}

  @font-face {
    font-family: "testFont";
        src: url("/assets/fontemon.otf");
  }
  </style>
  ${javascript}
  `,
  component: () => (
    <Page>
      <div style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginTop: 20
      }}>
        <div>test:</div>
        <div
          className="test"
          id="test"
          contentEditable
          style={{
            fontFamily: "testFont",
            minWidth: 250,
            minHeight: 250,
            fontSize: 100,
            backgroundColor: "white",
            color: "black",
            outline: `0px solid transparent`,
          }}
        ></div>
        <div>control:</div>
        <div>
          Type here for debug purposes. Or use the content editable div above
        </div>
        <textarea id="area"></textarea>
      </div>
    </Page>
  ),
};

export default output;
