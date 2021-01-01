import React, { FunctionComponent, ReactNode } from "react";
import HorizontalDivider from "./HorizontalDivider";

export const ExampleStep: FunctionComponent<{
  readonly step: ReactNode;
}> = ({ children, step }) => (
  <div>
    <h2>Step {step}:</h2>
    {children}
    <HorizontalDivider />
  </div>
);
