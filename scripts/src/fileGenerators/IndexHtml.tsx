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
import { exampleLink, faqLink } from "./lib/links";
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
  <script async src="${animationJS}"></script>
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
            <p>
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
            </p>
            <h3> Code Relay is to coding as a relay race is to running:</h3>
            <ol>
              <li>
                <p>
                  Just like a relay breaks up a footrace into a series of
                  smaller races, Code Relay breaks up an issue into a series of
                  small tasks!
                </p>
              </li>

              <li>
                <p>
                  In the same way that a different athlete runs each leg of a
                  relay race, Code Relay assigns each task to a different
                  contributor.
                </p>
              </li>
            </ol>

            <CodeBox
              wallId="first-guy"
              style={{
                marginTop: 70,
              }}
            >
              <h2>You can start your first task right now:</h2>
              <StartInstructions divide />
            </CodeBox>
            <p>Or keep reading to learn more about Code Relay.</p>
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
