import React from "react";
import CodeBox from "./lib/CodeBox";
import { commonCSS } from "./lib/commonCss";
import FAQ from "./lib/FAQ";
import FileGenerator from "./lib/FileGenerator";
import HeaderOffsetAnchor from "./lib/HeaderOffsetAnchor";
import HorizontalDivider from "./lib/HorizontalDivider";
import { whatIsItLink } from "./lib/links";
import Page from "./lib/Page";
import { maintainer } from "./lib/fileNames";

const output: FileGenerator = {
  fileType: "html",
  fileName: maintainer,
  title: "code relay - maintainer",
  head: `
  <style>
  ${commonCSS}
  </style>
  `,
  component: () => {
    return (
      <Page>
        <h1 style={{ textAlign: "center" }}>
          Maintainers: free up your time, so you can follow your passion!
        </h1>
        <CodeBox>
          <p>
            Open source maintainers are the heart and soul of open source. They
            are the ones who lead and/or own open source projects. This is page
            is all about how Code Relay can help out Maintainers.
          </p>
          <HorizontalDivider />
          <h4>Not a Maintainer?</h4>
          <p>
            You can still make a huge impact by becoming a Contributor!{" "}
            <a href={whatIsItLink}>Learn more here</a>.
          </p>
        </CodeBox>
        <p>
          It's no question that open source has become work. The same boring
          work you have to do at the office
          <ul>
            <li>Working with contributors instead of colleagues</li>
            <li>Internet politics instead of office politics</li>
            <li>And you still have to do the same grunt/busy work</li>
          </ul>
          But in open-source, there is no paycheck (or a very tiny one) waiting
          for you at the end of each week. It's no wonder why so many open
          source maintainers burn out and lose their passion.
        </p>
        <h2>Code Relay is here to fix that!</h2>
        <ul>
          <li>No more recruiting and onboarding contributors.</li>
          <li>You don't have to become a community manager</li>
          <li>Save hours of time</li>
        </ul>
        Just set up your tasks and you are good to go.
        <HorizontalDivider />
        <h2>How it works:</h2>
        <ol>
          <li>
            Create a task like: fix this bug, or write documentation for this
            part. Checkout{" "}
            <a href="https://github.com/mmulet/code-relay/wiki/Task-examples">
              the wiki
            </a>{" "}
            for some real examples or send email us at{" "}
            <a href="mailto:maintainer@coderelay.io">maintainer@coderelay.io</a>{" "}
            and we'll help you get started.
          </li>
          <li>
            Email your task description to{" "}
            <a href="mailto:newTask@coderelay.io">newTask@coderelay.io</a>. You
            will get a reply once your task has been processed and is in the
            system.
          </li>
          <li>
            Sit back and wait. Go write some code that you actually enjoy
            writing, or do something else productive. The future is yours, so
            make it a good one.
          </li>
          <li>
            Once your task is complete you will get a pull request with your
            requested changes!
          </li>
          <li>Repeat!</li>
        </ol>
        <HorizontalDivider />
        <h2>Rules:</h2>
        <ol>
          <li>
            Your repository must be licensed with an Open source initiative
            approved license<a href="#star">*</a>{" "}
            <a href="https://opensource.org/licenses">License</a>
            <div>
              This includes the most popular licenses you've ever heard of, such
              as BSD, GPL, or MIT licenses.
            </div>
          </li>
          <li>
            Your code must be a public repository hosted on GitHub
            <a href="#star-star">**</a> <a href="github.com">github.com</a>
          </li>
          <li>
            Finally, this isn't a rule, but a strong suggestion: Please include
            the words: "Made with CodeRelay.io" at the top of your repo's
            README.md
            <p>
              The more people know about Code Relay, the more people will
              contribute, and the better it is for all maintainers, including
              you.
            </p>
          </li>
        </ol>
        <div>
          That's it! You can make tasks for almost everything you can think of.
          Code Relay has just begun, so we are playing everything by ear.
        </div>
        <p>
          <HeaderOffsetAnchor id="star" />
          *We are not here to do your Paid/Professional work for you, we are
          here to make open source software for everyone.
        </p>
        <p>
          <HeaderOffsetAnchor id="star-star" />
          **We plan to support more hosting sites in the future. We are just
          starting with GitHub because it is the most popular, and users are
          likely to familiar with it.
        </p>
        <HorizontalDivider />
        <h2>Don't know where to start?</h2>
        <p>
          Send us an email at{" "}
          <a href="mailto:maintainer@coderelay.io">maintainer@coderelay.io</a>,
          and we'll help you set everything up.
        </p>
        <HorizontalDivider />
        <div>
          <FAQ />
        </div>
        <div>
          Questions concerns:
          <a href="mailto:maintainerQA@coderelay.io">mail me</a>
        </div>
      </Page>
    );
  },
};

export default output;
