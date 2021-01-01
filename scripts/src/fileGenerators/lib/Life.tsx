import React, { FunctionComponent } from "react";
import clientSideJavascript from "./clientSideJavascript";
import CodeBox from "./CodeBox";
import grabStyle from "./grabStyle";
import HighlightedCode from "./HighlightedCode";

const runLifeButtonId: RunLifeButtonId = `runlifebutton`;
const speedInputId: SpeedInputId = `speed`;
const codeId: CodeId = `code`;
const errorId: RunLifeErrorId = `runLifeError`;

const initialFps = 2;

export const javascript = clientSideJavascript("runLife");

const RelayButton: FunctionComponent<{
  readonly id: string;
  readonly onClick: string;
}> = ({ id, children, onClick }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<button class="fit code-box" style="${grabStyle(
        <CodeBox
          style={{
            border: "none",
            color: "white",
            cursor: "pointer",
            margin: 0,
            boxShadow: "2px 2px 5px 0px #000000",
          }}
        ></CodeBox>
      )}" id="${id}" onClick="${onClick}">${children}</button>`,
    }}
  ></div>
);

export default () => (
  <>
    <h2>Welcome to the bottom of the page. </h2>
    <p>
      Since you have ventured this far down, I have a treat for you. Below is
      the code for a game of life using the code for this game of life as the
      input!
    </p>
    <h4>Recursive life!</h4>
    <p> It's editable too, so happy hacking!</p>
    <div id={errorId}></div>
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-evenly",
        marginBottom: 20,
      }}
    >
      <RelayButton id={runLifeButtonId} onClick="runLife()">
        Run
      </RelayButton>

      <RelayButton id={""} onClick="reset()">
        Reset
      </RelayButton>
    </div>
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
      }}
    >
      <label>Speed:</label>
      <span
        dangerouslySetInnerHTML={{
          __html: `<input
            type="range"
            min="1"
            max="60"
            value="${initialFps}"
            onchange="speedChange(this)"
            >`,
        }}
      ></span>
      <span id={speedInputId}>{initialFps}</span> <span>fps</span>
    </div>
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <CodeBox
        style={{
          maxHeight: 400,
          overflow: "auto",
          padding: 5,
        }}
      >
        <HighlightedCode
          editable
          codeId={codeId}
          prettier={{
            printWidth: 40,
          }}
          codeExampleFileName="../compiled/clientSide/LifeGame.js"
        />
      </CodeBox>
    </div>

    <ul>
      <li>
        Who lives, who dies, who tells your story, is determined by the
        character's position.
      </li>
      <li>
        Keeping with the "life" theme of the game, the colors and characters
        themselves are decided by genetic algorithms. New cells inherit things
        from their parents. This has a random component, which makes every game
        different.
      </li>
      <li>
        It works with emojis too, I have borne witness to the great war between
        the red open parenthesis and the sheep emoji. (Woooldn't you know, the
        sheep won)
      </li>
    </ul>
  </>
);
