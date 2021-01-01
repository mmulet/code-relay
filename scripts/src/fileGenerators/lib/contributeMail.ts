import { howDoesItWorkId } from "./howDoesItWorkId";
import { contributeEmailAddress } from "./contributeEmailAddress";

export class AnswerSpace {
  answer = 0;
  gen = () => {
    const num = this.answer.toString(2).padStart(3, "0");
    const line = `${num}------${Array.from(num).reverse().join("")}`;
    this.answer++;
    return `${line}
       
       
       
${line}`;
  };
}

export const contributeMail = (() => {
  const a = new AnswerSpace();

  const output = `
I want to contribute!

------
  
Hello and welcome to Code Relay!

Send this email to ${contributeEmailAddress} to begin!

After you send this email, we will send a reply with
info on your first task and instructions 
about how to complete it. 

You should receive a response within 5 minutes, but 
if not, please be patient.
Code Relay is brand new and 
we are still working out the kinks.
-------
You can send this right away, and everything will work.
But it would really help us out if you could answer
these 3 questions first.

Please write your response between the spaces provided.

What programming language/framework 
do you want to work with?
${a.gen()}

Do you want to be added to the public leaderboards?
And if so, what do you want your entry to say?
For example, you could add your github username, 
your twitter handle, a link to your personal website or 
even a a gemini:// page.
The default is anonymous. Literally, the word anonymous.
${a.gen()}

Do you want to sign up for the code-relay newsletter?
(Once a week. Unsubscribe any time)
The newsletter contains:
 - The public leaderboard results for the week
 - Community updates.
 - Highlights of open source projects helped by code relay
 - and more
${a.gen()}


Finally, do you have any questions, comments, or 
jokes you would like added to the newsletter? 
We read all of these emails so ask anything:
${a.gen()}

------
Learn more about code-relay here:
https://coderelay.io/#${howDoesItWorkId}

Check out the status of code-relay on the Github Page:
https://github.com/mmulet/code-relay

----------
Your name, email address, or any other personal information 
is not sold to or shared with any third-parties.`;

  const lines = output.split("\n");
  const maxLineLength = 60;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length <= maxLineLength) {
      continue;
    }
    console.log(
      `\x1b[32mContribute mail warning.\x1b[37m
Line \x1b[32m${i}\x1b[37m too long.
    ${line.substring(
      0,
      maxLineLength
    )}\x1b[31m|||||\x1b[89m\x1b[37m${line.substring(maxLineLength)}\x1b[89m`
    );
  }

  return output;
})();
