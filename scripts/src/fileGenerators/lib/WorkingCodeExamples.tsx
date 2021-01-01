import React from "react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { codeExamplesDirectory } from "./directories";

/**
 * Make sure these example stay in sync with ./codeExamples
 */
const spinClassName = "spin";

export const LoadingSpinnerStep5 = () => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        position: "relative",
      }}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          className={spinClassName}
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            animationDelay: `${index / 1.65}s`,
          }}
          key={index}
        >
          <Circle />
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinnerMerge4AAnd4B = () => (
  <div
    style={{
      width: 50,
      height: 50,
    }}
  >
    <div className={spinClassName}>
      <Circle />
    </div>
  </div>
);

export const LoadingSpinnerStep4B2 = () => (
  <div
    style={{
      width: 50,
      height: 50,
    }}
  >
    <div className={spinClassName}>
      <Square />
    </div>
  </div>
);

const step4B1ClassName = "spinStep4B1";

export const LoadingSpinnerStep4B1 = () => (
  <div
    style={{
      width: 50,
      height: 50,
    }}
  >
    <div className={step4B1ClassName}>
      <Square />
    </div>
  </div>
);

export const Square = () => (
  <div
    style={{
      width: 15,
      height: 15,
      backgroundColor: "#ff453a",
    }}
  ></div>
);

export const Circle = () => (
  <div
    style={{
      width: 15,
      height: 15,
      backgroundColor: "#ff453a",
      borderRadius: "50%",
    }}
  ></div>
);

export const workingCodeExamplesCss = `
${readFileSync(resolve(codeExamplesDirectory, "./spin4B1.css"))
  .toString()
  .replace(new RegExp(`\\.${spinClassName}`, "g"), `.${step4B1ClassName}`)
  .replace(/spinner/g, "spinnerStep4B1")}
${readFileSync(resolve(codeExamplesDirectory, "./spin4B2.css")).toString()}
`;
