import React, { FunctionComponent } from "react";
import CodeBox, { codeBoxColor } from "./CodeBox";
import {
  exampleLink,
  faqLink,
  gettingStartedLink,
  maintainerLink,
  navigationLink,
  whatIsItLink,
  whyLink,
} from "./links";
import TitleImage from "./TitleImage";

const Title = ({ type }: { readonly type: "wide" | "center" }) => (
  <a className={`${type}-title`} href="index.html">
    <TitleImage />
  </a>
);

const ButtonBox: FunctionComponent<{}> = ({ children }) => (
  <CodeBox
    noSnow
    style={{
      marginTop: 0,
      marginBottom: 0,
      padding: 5,
      marginRight: 5,
      boxShadow: "2px 2px 5px 0px #000000",
      textAlign: "center",
    }}
  >
    {children}
  </CodeBox>
);

const Header: FunctionComponent<{
  readonly navShouldBeBackButton?: boolean;
  readonly snowButton?: boolean;
}> = ({ navShouldBeBackButton }) => (
  <header
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: codeBoxColor,
      boxShadow: "0px 6px 5px 0px #000000",
      minWidth: "100%",
    }}
  >
    <div
      style={{
        padding: 5,
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
      }}
    >
      <Title type="wide" />
      <div className="hamburger-button">
        {/* Not dangerous we are on the server */}
        {navShouldBeBackButton ? (
          <span
            dangerouslySetInnerHTML={{
              __html:
                '<button class="nav-button" onclick="window.history.go(-1)">☰</button>',
            }}
          ></span>
        ) : (
          <a
            className="nav-button"
            href={navigationLink}
            style={{
              textDecoration: "none",
            }}
          >
            ☰
          </a>
        )}
      </div>
      <div className="wide-nav">
        <ButtonBox>
          <a
            href={whatIsItLink}
            style={{
              marginRight: 5,
              textDecoration: "none",
            }}
          >
            What is it?
          </a>
        </ButtonBox>
        <ButtonBox>
          <a
            href={whyLink}
            style={{
              marginRight: 5,
              textDecoration: "none",
            }}
          >
            Why?
          </a>
        </ButtonBox>
        <ButtonBox>
          <a
            href={faqLink}
            style={{
              marginRight: 5,
              textDecoration: "none",
            }}
          >
            FAQ
          </a>
        </ButtonBox>
        <ButtonBox>
          <a
            href={exampleLink}
            style={{
              textDecoration: "none",
            }}
          >
            Examples
          </a>
        </ButtonBox>
        <ButtonBox>
          <a
            href={maintainerLink}
            style={{
              textDecoration: "none",
            }}
          >
            Are you a maintainer?
          </a>
        </ButtonBox>
      </div>
      <div
        style={{
          color: "#FFFD42",
          flex: 1,
          justifyContent: "center",
          display: "flex",
          flexFlow: "row",
        }}
      >
        <Title type="center" />
      </div>
      {/* {!snowButton ? null : (
        <ButtonBox>
          <div
            dangerouslySetInnerHTML={{
              __html: `<button style="cursor:pointer;border:none;background-color:unset;" onclick="toggleSnow()">❄️
  </button>`,
            }}
          ></div>
          <div id="snow-header-button" style={{ minHeight: 1, minWidth: "100%", backgroundColor: "rgb(255,69,58)" }}></div>
        </ButtonBox>
      )} */}

      <a
        href={gettingStartedLink}
        style={{
          paddingRight: 5,
          textDecoration: "none",
        }}
      >
        Start Now!
      </a>
    </div>
  </header>
);
export default Header;
