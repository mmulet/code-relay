import React from "react";
import { contributeEmailAddress } from "./contributeEmailAddress";
import { contributeMailHref } from "./contributeMailHref";
import HorizontalDivider from "./HorizontalDivider";
import PrivacyDisclaimer from "./PrivacyDisclaimer";

export default ({ divide }: { readonly divide?: boolean }) => (
  <>
    <ol>
      <li>
        Send an email to{" "}
        <a href={contributeMailHref}>{contributeEmailAddress}</a> or{" "}
        <a href="https://github.com/mmulet/code-relay/issues">
          open an issue code-relay repo
        </a>
        <br />
        Subject or issue Title: Contribute
        <br />
        Body: Programming language/framework you want to work with
      </li>
      <li>
        By 7 a.m. Pacific time the next day, Code Relay will reply with your
        first task! Spend 15 minutes or less on it, break it down into smaller
        tasks, etc. Then pass it on to the next contributor. All the fun of coding without the responsibility.
      </li>
    </ol>
    <p>That's it! Go from click to commit in 15 minutes!</p>
    {divide ? <HorizontalDivider /> : null}
    <PrivacyDisclaimer />
  </>
);
