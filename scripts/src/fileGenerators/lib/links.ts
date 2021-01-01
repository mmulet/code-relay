import { faqId } from "./faqId";
import { whyId } from "./whyId";
import { whatIsIt } from "./WhatIsIt";
import {
  examples,
  gettingStarted,
  maintainer,
  navigation,
  privacy,
  terms,
} from "./fileNames";

const indexPageFragment = (fragment: string) => `/#${fragment}`;

export const whatIsItLink = indexPageFragment(whatIsIt);
export const whyLink = indexPageFragment(whyId);
export const faqLink = indexPageFragment(faqId);

const pageLink = (link: string) => `${link}`;

export const gettingStartedLink = pageLink(gettingStarted);
export const maintainerLink = pageLink(maintainer);
export const privacyLink = pageLink(privacy);
export const termsLink = pageLink(terms);
export const navigationLink = pageLink(navigation);
export const exampleLink = pageLink(examples);
