import React from "react";
import CodeBox from "./CodeBox";
import HeaderOffsetAnchor from "./HeaderOffsetAnchor";
import { contributeMailHref } from "./contributeMailHref";
import { contributeEmailAddress } from "./contributeEmailAddress";
import { maintainerLink } from "./links";
export const whatIsIt = "WhatIsIt";

export default () => (
  <div>
    <HeaderOffsetAnchor id={whatIsIt} />
    <h2>CodeRelay: What is it?</h2>
    <CodeBox wallId="second-guy">
      <em>Code relay</em> is a development platform for writing open source
      software using the code-relay workflow.
      <h3>Code Relay Workflow:</h3>
      <ol>
        <li>An open source Maintainer uploads a task to Code Relay.</li>
        <div>
          <code>
            <span className="token keyword">do</span>{" "}
          </code>
          <code>
            <span className="token punctuation">{"{\n"}</span>
          </code>
          <div
            style={{
              paddingLeft: 35,
            }}
          >
            <li>Code Relay assigns this task to a Contributor.</li>
            <li>
              The Contributor only completes a small part of the task, passing
              the rest on to the next Contributor.
            </li>
          </div>
          <code>
            <span className="token punctuation">{"} "}</span>
            <span className="token keyword">while</span>
            <span className="token punctuation">(</span>
            task_is_not_yet_complete
            <span className="token punctuation">);</span>
          </code>
        </div>
      </ol>
    </CodeBox>
    <h4>Analogies:</h4>
    <ul>
      <li>Code relay is to coding as a relay race is to running.</li>
      <li>Stack Overflow questions meets Github pull-requests</li>
    </ul>
    <h3>Let's break that down:</h3>
    <p>
      Open source maintainers, the owners and lead developers of open source
      projects, submit tasks to code relay. (
      <a href={maintainerLink}>
        Are you a maintainer? Learn how to submit tasks here
      </a>
      )
    </p>
    <CodeBox wallId="third-guy" style={{
      marginTop: 40
    }}>
      <h3>Tasks like</h3>
      <ul>
        <li>Add some unit tests for this function</li>
        <li>Document this class</li>
        <li>Look for a fix for this issue</li>
      </ul>
    </CodeBox>
    <p>Code Relay assigns these tasks to "Contributors"</p>
    <CodeBox wallId="fourth-guy" style={{
      marginTop: 64
    }}>
      <h3>Become a Contributor!</h3>
      <p>
        Send an email to <a href={contributeMailHref}>{contributeEmailAddress}</a>.
      </p>{" "}
      <p>Code Relay will reply with a task.</p>
    </CodeBox>
    <p>
      So, Code Relay has replied to your email and assigned you a task. You are
      probably thinking:
    </p>
    <p>You: "So, now I have to complete this task, right?"</p>
    <h2>Answer: No!</h2>
    <p>
      {" "}
      This is code <em>relay</em>, relay as in{" "}
      <a href="https://en.wikipedia.org/wiki/Relay_race">relay race</a>. Your
      job is to take this task, and make <em>incremental</em> progress. You
      could:
      <ul>
        <li>Divide the task into two or more smaller tasks</li>
        <li>Lookup relevant parts of the documentation.</li>
        <li>Narrow the scope of the task.</li>
      </ul>
    </p>
    <p>
      It's not a marathon all-night coding session. You get in, and get out
      within...let's say 5 minutes!
    </p>
    <p>That's it.</p>
    <p>
      <ul>
        <li>No hunting for issues tagged: "good-first-bug".</li>
        <li>No ignored pull-requests.</li>
        <li>No hassle</li>
      </ul>
      Just you and the code.
    </p>
    {/* <div>
      Here's an example from start to finish:
      <Example1 />
    </div> */}
  </div>
);
