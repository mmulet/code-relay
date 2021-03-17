import React from "react";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import Page from "./lib/Page";
import { fontemon } from "./lib/fileNames";
import { FontKid, javascript, css } from "./lib/FontKid";
import CodeBox from "./lib/CodeBox";

const output: FileGenerator = {
  fileType: "html",
  fileName: fontemon,
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
          You read that right! It's a video game in a font! A font as in "Time
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
        <h2>
          All the places you should never play games, but now you can because no
          one will stop you!
        </h2>
        <CodeBox>
          <h2>Things to do:</h2>
          <ul>
            <li>
              <a href="#player">Play on your web browser</a>
            </li>
            <li>
              <a href="https://github.com/mmulet/font-game-engine/releases/download/1.0/fontemon_small.otf">
                Download the font
              </a>{" "}
              play anywhere!
              <div>
                Checkout the{" "}
                <a href="https://github.com/mmulet/font-game-engine/releases/">
                  releases
                </a>{" "}
                page for the latest version.
              </div>
            </li>
            <li>
              <a href="https://github.com/mmulet/code-relay/tree/main/markdown/HowIDidIt.md">
                Read the technical blog post. Find out how it works!
              </a>
            </li>
            <li>
              <a href="https://github.com/mmulet/code-relay/tree/main/markdown/Tutorial.md">
                Make Your Own Font Game!
              </a>{" "}
              No programming knowledge necessary! Anyone can do it!
            </li>
          </ul>
        </CodeBox>

        <FontKid />
        <div>
          Checkout the image credits <a href="https://github.com/mmulet/code-relay/tree/main/markdown/fontemon_credits">here</a>
        </div>
      </div>
    </Page>
  ),
};

export default output;
