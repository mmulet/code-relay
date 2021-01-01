import React, { FunctionComponent, ReactNode } from "react";
import Header from "./Header";
import HorizontalDivider from "./HorizontalDivider";
import { termsLink, privacyLink } from "./links";

const Page: FunctionComponent<{
  readonly above?: ReactNode;
  readonly snowButton?: boolean
}> = ({ children, above, snowButton }) => (
  <>
    <Header snowButton={snowButton} />
    {above}
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <div
        className="padded"
        style={{
          maxWidth: 600,
          marginTop: 40,
        }}
      >
        {children}
      </div>
      <footer
        style={{
          marginBottom: 25,
        }}
      >
        <HorizontalDivider />
        <div>© 2020 Late for Dinner Studios, LLC</div>
        <div>
          <a href={termsLink}>Terms</a> <a href={privacyLink}>Privacy</a>
        </div>
      </footer>
    </div>
  </>
);

export default Page;
