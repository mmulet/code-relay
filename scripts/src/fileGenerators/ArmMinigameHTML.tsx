import React from "react";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import Page from "./lib/Page";
import CodeBox from "./lib/CodeBox";
import SpriteSheetPNGImage from "./lib/SpriteSheetPNGImage";
import { arm, armMiniGameJS } from "./lib/fileNames";

const output: FileGenerator = {
  fileType: "html",
  fileName: arm,
  title: "code relay - Mini game time",
  head: `
  <style>
  ${commonCSS}
  </style>
  <script async src="./${armMiniGameJS}"></script>
  `,
  component: () => (
    <Page>
      <h1>You've found it</h1>
      <h2>Welcome to the arm mini-game</h2>
      <p>
        Batons will fall from the top of the screen, your goal is to catch as
        many as you can in 30 seconds. But you have to use the crazy, bendy,
        arm-claw-pipe things! The arms will grow to whatever point you
        click/tap, but never is a straight line!
      </p>
      <div>Good luck!</div>

      <div
        style={{
          minHeight: 300,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
        }}
      >
        <CodeBox
          style={{
            minWidth: 150,
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
          }}
          wallId="third-guy"
        >
          <div
            style={{
              minWidth: "100%",
            }}
            dangerouslySetInnerHTML={{
              __html: `<button style="min-height:40px;min-width:100%;background-color: unset; border: none; color: white;" onclick="start()"></button>`,
            }}
          ></div>
        </CodeBox>
      </div>
      <div>
        As always the code is un-minified and available at a developer tools
        near you. You can also find the typescript code here:
      </div>

      <SpriteSheetPNGImage src="guy3.png" />
    </Page>
  ),
};

export default output;
