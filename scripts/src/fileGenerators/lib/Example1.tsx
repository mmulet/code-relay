import React from "react";
import CodeExample from "./CodeExample";
import CodeExampleWithOutput from "./CodeExampleWithOutput";
import { ExampleStep } from "./ExampleStep";
import DualCodeExampleWithOutput from "./MultiCodeExampleWithOutput";
import {
  Circle,
  LoadingSpinnerStep4B1,
  LoadingSpinnerStep4B2,
  LoadingSpinnerMerge4AAnd4B,
  LoadingSpinnerStep5,
} from "./WorkingCodeExamples";


export default () => (
  <div>
    <ExampleStep step="1">
      <p>
        Here we go! Example time! Alice, maintainer of an awesome open-source
        react app needs a new loading spinner. So, she uploads a new tak to
        code-relay:
      </p>
      <CodeExample codeExampleFileName="step2.jsx" />
      <p>
        Simple enough! She goes on to to work on something else and let's
        code-relay handle the rest
      </p>
    </ExampleStep>
    <ExampleStep step="2">
      <p>
        Bob emails {/*@TODO put email here */} and code-relay assigns him this
        task. He takes a quick look at it and divides it into two smaller tasks.
        1. Making a circle. 2. Making the circle spin. Then sends it on its way.
      </p>
      <CodeExample codeExampleFileName="step3.jsx" />
    </ExampleStep>
    <ExampleStep step="3-A">
      <p>
        Code-relay assigns making the circle to Christine, who decides to make
        the circle using some css styles.
      </p>
      <CodeExampleWithOutput codeExampleFileName="step4A.jsx">
        <Circle />
      </CodeExampleWithOutput>
    </ExampleStep>
    <ExampleStep step="3-B">
      <p>
        At the same time as Christine, Doug is assigned making the circle move.
        He creates an animation in css, but it doesn't turn out like he hoped.
        It's moving in a diamond, instead of a circle. So, he creates a new task
        to fix this and sends it along.
      </p>
      <DualCodeExampleWithOutput
        examples={[
          {
            fileName: "step4B.jsx",
            displayFileName: "jsx",
          },
          {
            fileName: "spin4B1.css",
            displayFileName: "css",
          },
        ]}
      >
        <LoadingSpinnerStep4B1 />
      </DualCodeExampleWithOutput>
    </ExampleStep>
    <ExampleStep step="3-B part 2">
      <p>Emily, takes a look at the code and finds a fix.</p>
      <DualCodeExampleWithOutput
        examples={[
          {
            fileName: "step4B.jsx",
            displayFileName: "jsx",
          },
          {
            fileName: "spin4B2.css",
            displayFileName: "css",
          },
        ]}
      >
        <LoadingSpinnerStep4B2 />
      </DualCodeExampleWithOutput>
    </ExampleStep>
    <ExampleStep step="Merge 3-A and 3-B">
      <p>
        Code relay assigns the task of merging our two branches to Fred. He
        leaves the css unchanged and merges the .jsx. He decides everything
        looks good, but the spinner is missing more circles, so he makes a task
        for that.
      </p>
      <CodeExampleWithOutput codeExampleFileName="stepMerge4Aand4B.jsx">
        <LoadingSpinnerMerge4AAnd4B />
      </CodeExampleWithOutput>
    </ExampleStep>
    <ExampleStep step="4">
      <p>Grace adds 4 more circles with and calls it a day!</p>
      <CodeExampleWithOutput codeExampleFileName="step5.jsx">
        <LoadingSpinnerStep5 />
      </CodeExampleWithOutput>
    </ExampleStep>
    <p>Done. That's the life of one code-relay</p>
  </div>
);
