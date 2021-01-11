import React, { FunctionComponent } from "react";
import CodeBox from "./lib/CodeBox";
import { commonCSS } from "./lib/commonCss";
import FileGenerator from "./lib/FileGenerator";
import Header from "./lib/Header";
import {
  exampleLink,
  faqLink,
  gettingStartedLink,
  maintainerLink,
  webPageGitHubRepoLink,
  whatIsItLink,
  whyLink,
} from "./lib/links";
import { navigation } from "./lib/fileNames";

const CodeLink: FunctionComponent<{
  readonly href: string;
}> = ({ href, children }) => (
  <a
    {...{
      href,
    }}
    style={{
      textDecoration: "none",
    }}
  >
    <CodeBox>{children}</CodeBox>
  </a>
);

const output: FileGenerator = {
  fileType: "html",
  fileName: navigation,
  title: "code relay - navigation",
  head: `
  <style>
  ${commonCSS}
  </style>
  `,
  component: () => {
    return (
      <div
        className="padded"
        style={{
          paddingTop: 55,
        }}
      >
        <Header navShouldBeBackButton />
        <CodeLink href={whatIsItLink}>
          <span className="token function">what_is_it</span>
          <span className="token operator">?()</span>
          <span className="token keyword">;</span>
        </CodeLink>
        <CodeLink href={whyLink}>
          <span className="token boolean">GOTO </span>
          <span className="token function">Why?</span>
        </CodeLink>
        <CodeLink href={exampleLink}>
          <span className="token inserted">(</span>
          <span className="token operator">+ </span>
          <span className="token punctuation">(</span>
          <span className="token operator">+ </span>
          <span className="token function">Examples </span>
          <span className="token boolean">1</span>
          <span className="token punctuation"> )</span>
          <span className="token inserted"> )</span>
        </CodeLink>
        <CodeLink href={maintainerLink}>
          <span className="token punctuation">def </span>
          <span className="token function">Are_you_a_maintainer?</span>
          <span className="token operator">():</span>
        </CodeLink>
        <CodeLink href={gettingStartedLink}>
          <span className="token function">Start_now</span>
          <span className="token operator">(</span>
          <span className="token inserted">[</span>
          <span className="token boolean">X</span>
          <span className="token punctuation">|</span>
          <span className="token boolean">Y</span>
          <span className="token inserted">]</span>
          <span className="token operator">)</span>
          <span className="token property"> :-</span>
        </CodeLink>
        <CodeLink href={faqLink}>
          <span className="token inserted">x</span>
          <span className="token comment">[</span>
          <span className="token property">⍋</span>
          <span className="token inserted">x</span>
          <span className="token function-name">←</span>
          <span className="token function">FAQ</span>
          <span className="token comment">]</span>
        </CodeLink>
        <CodeLink href={webPageGitHubRepoLink}>
          <span className="token operator">@</span>
          <span className="token function">Github </span>
          <span className="token boolean">= </span>
          <span className="token inserted">2</span>
        </CodeLink>
      </div>
    );
  },
};

export default output;
