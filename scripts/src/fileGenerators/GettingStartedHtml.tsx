import React from "react";
import { commonCSS } from "./lib/commonCss";
import Page from "./lib/Page";
import { gettingStarted } from "./lib/fileNames";
import AreYouAMaintainer from "./lib/AreYouAMaintainer";
import HorizontalDivider from "./lib/HorizontalDivider";
import StartInstructions from "./lib/StartInstructions";
import { exampleLink, faqLink, whatIsItLink } from "./lib/links";
import { questionMailHref } from "./lib/questionMailHref";
import FileGenerator from "./lib/FileGenerator";

const mailId = "mail";
const copyClass = "copy-button";

const output: FileGenerator = {
  fileType: "html",
  fileName: gettingStarted,
  title: "code relay - getting started",
  head: `
  <style>
  ${commonCSS}
  </style>
  <script>
      const copy = () => {
          navigator.clipboard.writeText(document.querySelector("#${mailId}").value)
          Array.from(document.querySelectorAll(".${copyClass}")).map(n => n.innerText = "Copied!")
      }
  </script>
  `,
  component: () => (
    <Page>
      <h1>Getting started!</h1>
      <p>Starting is easy:</p>
      <StartInstructions />

      <HorizontalDivider />

      <h3>Want to learn more about Code Relay?</h3>
      <p>
        <ul>
          <li>
            <a href={whatIsItLink}>You can read what code Relay is all about</a>
          </li>
          <li>
            {" "}
            <a href={exampleLink}>Check out some examples</a>
          </li>
          <li>
            Have any questions? Checkout out the{" "}
            <a href={faqLink}>Frequently Asked Questions</a> or send Mike an
            email at <a href={questionMailHref}>mike@coderelay.io</a>
          </li>
        </ul>
      </p>
      <HorizontalDivider />
      <AreYouAMaintainer />
    </Page>
  ),
};

export default output;
