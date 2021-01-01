import React from "react";
import Goal from "./lib/Goal";
import WhatIsIt from "./lib/WhatIsIt";
import { commonCSS } from "./lib/commonCss";
import SplashImage from "./lib/SplashImage";
import Page from "./lib/Page";
import HorizontalDivider from "./lib/HorizontalDivider";
import CodeBox from "./lib/CodeBox";
import FAQ from "./lib/FAQ";
import { animationJS, arm, index } from "./lib/fileNames";
import { exampleLink, faqLink, gettingStartedLink } from "./lib/links";
import { questionMailHref } from "./lib/questionMailHref";
import StartInstructions from "./lib/StartInstructions";
import Life, { javascript as runLifeJavascript } from "./lib/Life";
import Snow from "./lib/Snow";
import { AnimationSpriteSheets } from "./lib/Animation";
import FileGenerator from "./lib/FileGenerator";

const output: FileGenerator = {
  fileType: "html",
  fileName: index,
  title: "code relay",
  head: `

  <style>
  ${commonCSS}
  </style>
  <script async src="/${animationJS}"></script>
  ${runLifeJavascript}
  `,
  component: () => {
    return (
      <>
        <Page
          snowButton
          above={
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              <SplashImage />
            </div>
          }
        >
          <div>
            <CodeBox
              wallId="first-guy"
              style={{
                marginTop: 0,
              }}
            >
              Welcome to{" "}
              <span
                style={{
                  color: "#FFFD42",
                  fontSize: 20,
                }}
              >
                code
                <span
                  style={{
                    fontSize: 30,
                  }}
                >
                  Relay
                </span>
              </span>{" "}
              : The fastest and easiest way to contribute to open source!
              <br /> From click to commit in 5 minutes:
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "center",
                  marginTop: 15,
                }}
              >
                <a href={gettingStartedLink}>Start now!</a>
              </div>
            </CodeBox>
            <Snow />
            <HorizontalDivider />
            <WhatIsIt />
            <HorizontalDivider />
            <Goal></Goal>
            <HorizontalDivider />
            <h2>Try it out!</h2>
            <p>
              Now that you took 5 minutes to learn what Code Relay is all about
              and why, the next logical step is to spend the next 5 minutes
              trying it out:
              <CodeBox
                wallId="sixth-guy"
                style={{
                  marginTop: 96,
                }}
              >
                <h2>Start Now!</h2>
                <StartInstructions divide />
              </CodeBox>
              For a tiny amount of your time, you will get: An easy way to light
              up your GitHub contribution graph,
              {/** @TODO */}
              <h3>Want to learn more about Code Relay?</h3>
              <ul>
                <li>
                  <a href={exampleLink}>Check out some examples</a>
                </li>
                <li>
                  Have any questions? Checkout out the{" "}
                  <a href={faqLink}>Frequently Asked Questions</a> or send Mike
                  an email at <a href={questionMailHref}>mike@coderelay.io</a>
                </li>
              </ul>
            </p>
            <HorizontalDivider />
            <h2>Code Relay: When and where?</h2>
            <p>Any time. Any place.</p>
            <HorizontalDivider />
          </div>
          <FAQ />
          <HorizontalDivider />
          <Life />
          <HorizontalDivider />
          <div>
            <a href={arm}>Okay, here's one last easter egg for you</a>
          </div>
        </Page>
        <AnimationSpriteSheets />
      </>
    );
  },
};

export default output;
