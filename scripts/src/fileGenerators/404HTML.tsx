import React from "react";
import CodeExample from "./lib/CodeExample";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import HorizontalDivider from "./lib/HorizontalDivider";
import Page from "./lib/Page";
import { notFound } from "./lib/fileNames";

const output: FileGenerator = {
  fileType: "html",
  fileName: notFound,
  title: "code relay - Page not found",
  head: `
  <style>
  ${commonCSS}
  </style>
  <script>
  const getCode = (that) => that.parentElement.parentElement.previousSibling.innerText
  const runCode = (that) => eval(getCode(that))
  const copyCode = (that) => navigator.clipboard.writeText(getCode(that))
  </script>
  `,
  component: () => (
    <Page>
      <h1>Page not found</h1>
      {/** @TODO */}
      <p>
        If one of our links are dead, please submit an issue:{" "}
        <a href="">here</a>
      </p>
      <HorizontalDivider />
      <p>
        No one enjoys lost pages, but everyone* enjoys recursively
        self-replicating code: this is some code to generate this code which
        will generate some code to generate this code which will generate some
        code to generate...
      </p>
      <div id="code1">
        <CodeExample codeExampleFileName="notFound.jsx">
          <div
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `<button onclick="copyCode(this)">Copy code</button>`,
              }}
            ></div>
            <div
              dangerouslySetInnerHTML={{
                __html: `<button onclick="runCode(this)">Run code</button>`,
              }}
            ></div>
          </div>
        </CodeExample>
      </div>

      <p>*yes, everyone. No exceptions.</p>
      <div id="allCode"></div>
    </Page>
  ),
};
export default output;
