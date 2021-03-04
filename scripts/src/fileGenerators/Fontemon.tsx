import React from "react";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import Page from "./lib/Page";
import { fontemonTest } from "./lib/fileNames";
import { FontKid, javascript, css } from "./lib/FontKid";
import CodeBox from "./lib/CodeBox";

const output: FileGenerator = {
  fileType: "html",
  fileName: fontemonTest,
  title: "code relay - Fontemon",
  head: `
  <style>
  ${commonCSS}
  ${css}
  .pixel-scale {
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
  </style>
  ${javascript}
  `,
  component: () => (
    <Page year={2021}>
      <div
        style={{
          marginTop: 100,
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        <div>
          <img
            className="pixel-scale"
            width="264"
            height="128"
            src="/assets/fontemonLogo.png"
          />{" "}
          TM
        </div>
        <h2>World's first video game in a font!</h2>
        <CodeBox>
          <h2>Just want to play? </h2>{" "}
          <a href="#player">Jump to the Web Font player!</a>
        </CodeBox>
        <p>
          You heard that right! It's a video game in a font! A font as in "Time
          New Roman". The entire game is enclosed in fontemon.otf, no
          javascript, no html, all font.
        </p>
        <h2>You can play it anywhere!</h2>
        <CodeBox>
          <h3>Your word processor!</h3>
          <img
            style={{
              maxWidth: "100%",
            }}
            src="/assets/snip.png"
          />
        </CodeBox>
        <CodeBox>
          <h3>Your image editor!</h3>
          <img
            style={{
              maxWidth: "100%",
            }}
            src="/assets/image_editor.png"
          />
        </CodeBox>
        <CodeBox>
          <h3>Your code editor!</h3>
          <img
            style={{
              maxWidth: "100%",
            }}
            src="/assets/codeEditor.png"
          />
          <h3>Even works with syntax highlighting</h3>
        </CodeBox>
        <div>
          It's just a font! Anywhere you can use a font, now you can play games!
        </div>
        <FontKid />
      </div>
    </Page>
  ),
};

export default output;
