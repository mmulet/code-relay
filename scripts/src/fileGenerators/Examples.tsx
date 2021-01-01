import React from "react";
import { commonCSS } from "./lib/commonCss";
import Example1 from "./lib/Example1";
import FileGenerator from "./lib/FileGenerator";
import Page from "./lib/Page";
import { workingCodeExamplesCss } from "./lib/WorkingCodeExamples";
import { examples } from "./lib/fileNames";

const output: FileGenerator = {
  fileType: "html",
  fileName: examples,
  title: "code relay - examples",
  head: `
  <style>
  ${commonCSS}
  
  ${workingCodeExamplesCss}
  </style>
  
  `,
  component: () => (
    <Page>
      <h1>Examples</h1>
      <Example1 />
    </Page>
  ),
};

export default output;
