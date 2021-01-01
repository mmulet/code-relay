import React from "react";
import { privacyLink } from "./links";

export default () => (
  <p>
    {" "}
    Your name, email address, or any other personal information is not sold to
    or shared with any third-parties. Check out our{" "}
    <a href={privacyLink}>privacy policy</a>
  </p>
);
