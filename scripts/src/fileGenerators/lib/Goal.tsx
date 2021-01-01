import React, { FunctionComponent } from "react";
import CodeBox from "./CodeBox";
import HeaderOffsetAnchor from "./HeaderOffsetAnchor";
import { whyId } from "./whyId";

const Num: FunctionComponent = ({ children }) => (
  <span className="token number">{children}</span>
);

const Op: FunctionComponent = ({ children }) => (
  <span className="token operator">{children}</span>
);

export default () => (
  <div>
    <HeaderOffsetAnchor id={whyId} />
    <h2>Code Relay: Why?</h2>
    <p>
      Here's something you may or may not know: the world runs on open source
      software. But, let's not sugarcoat things: up until now, open source was
      hard, thankless, work. Work done by a small number of dedicated and
      passionate <em>volunteers</em>. Volunteers who are now facing burn-out and
      the stark realities of people and companies using the fruits of their
      labor without giving back.
    </p>
    <p>
      So let's give back. Let's give back with a vengeance. If each of us spent
      a few minutes a day, we could contribute an enormous amount of code,
      measured in <em>billions</em> of lines. No kidding. Let me show you, but
      first, let me introduce you to our goal:
    </p>
    <CodeBox
      wallId="fifth-guy"
      style={{
        marginTop: 50,
      }}
    >
      <span>
        <span
          className="token operator"
          style={{
            fontSize: 20,
          }}
        >
          Goal:{" "}
        </span>
        <span style={{}}>
          Every software developer in the world to use CodeRelay for
        </span>{" "}
        <Num>5</Num> minutes every day.
      </span>
    </CodeBox>
    <ul>
      <li>
        There are about 25 million software developers in the world (and
        growing!!).
      </li>
      <li>
        Code relay takes a contributor about 5 minutes* to divide a task, and in
        that time, the developer contributes about two lines[1] of code
      </li>
    </ul>
    <p>
      If we can get every one of the to spend 5 minutes a day working on open
      source code, using code relay. We will get:
    </p>
    <CodeBox>
      <span className="token tag">
        <Num>25 million</Num> <Op>*</Op> <Num>2 lines of code</Num> <Op>*</Op>{" "}
        <Num>365 days</Num> <Op>=</Op> <Num>18 billion</Num> lines of code per
        year!!
      </span>
    </CodeBox>
    <h2>18 billion lines of code!</h2>
    <p>
      For comparison, that's enough to write :
      <ul>
        <li>left-pad: 400 millions times</li>
        <li>Chromium: 2000 times over</li>
        <li>The linux kernel: 500 times</li>
        <li>
          And all of Google's source code for all of their many services: 6
          times[2]!
        </li>
      </ul>
      Every year! This is open source's missing link! We can make our own web
      browsers, operating systems, anything you can dream of. The future is now,
      so let's make it a good one.
    </p>
    <div>
      [1] Two lines in 5 minutes is our goal. We don't have any actual
      statistics on this yet. Refer to the
      <a href="https://github.com/mmulet/code-relay/wiki/Goal!">wiki</a> to
      check up on this goal's progress.
    </div>
    <div>
      <p>
        [2]Source is{" "}
        <a href="https://web.archive.org/web/20201023155014if_/https://docs.google.com/spreadsheets/d/1s9u0uprmuJvwR2fkRqxJ4W5Wfomimmk9pwGTK4Dn_UI/edit#gid=5">
          here
        </a>
        . Admittedly, the data looks a little outdated, and everyone knows that
        lines-of-code is a shaky measurement at best, but this is just some{" "}
        <a href="https://en.wikipedia.org/wiki/Back-of-the-envelope_calculation">
          back-of-the-napkin math
        </a>
      </p>
      <p>
        Have better data? Please make a pull request
        <a href="https://github.com/mmulet/code-relay">here</a>
      </p>
    </div>
  </div>
);
