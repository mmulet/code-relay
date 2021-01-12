import React from "react";
import { faqId } from "./faqId";
import HeaderOffsetAnchor from "./HeaderOffsetAnchor";
import { whyLink } from "./links";
import QA from "./QA";

export default () => (
  <div>
    <HeaderOffsetAnchor id={faqId} />
    <h2>FAQ:</h2>
    <div>
      <QA q="Does Code Relay cost anything?">
        No. Code Relay is free for both Maintainers and Contributors. Code Relay
        exists to make the world a <a href={whyLink}>better place</a>.
      </QA>
      <QA q="What do you mean when you say 'open source'?">
        <p>
          All tasks submitted to Code Relay must be for a project licensed with
          an Open Source Initiative (OSI) approved{" "}
          <a href="https://opensource.org/licenses">license</a>, which means the
          project meets OSI's{" "}
          <a href="https://opensource.org/osd">definition of open source.</a>
        </p>
        <p>
          Practically, this ensures that all of your contributions are going to
          help the community, not to do someone's job for them.
        </p>
      </QA>
      <QA q="Does Code Relay replace GitHub, GitLab, etc.">
        No. This platform is meant to be used with those services, not replace
        them.
      </QA>
      <QA q="Does code-relay replace the pull-request workflow">
        No. Code relay is meant to supplement current workflows, not replace.
      </QA>
      <QA q="What backend are you using? Is it open source, where is the repo?">
        There isn't one, yet. Right now, I (<a href="https://github.com/mmulet">@mmulet</a>) respond to each email
        personally. When code relay grows large enough that it needs an
        automated backend, I intend to build it using code relay, and it will be
        open source.
      </QA>
    </div>
  </div>
);
