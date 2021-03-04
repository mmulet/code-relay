import React from "react";
import clientSideJavascript from "./clientSideJavascript";

export const javascript = clientSideJavascript("fontemonTest");
export const css = ` @font-face {
    font-family: "fontemon";
        src: url("/assets/fontemon.otf");
  }
 
  
  `;

export const FontKid = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        position: "relative",
        marginTop: 100,
        zIndex: 0,
        maxWidth: 252,
        minWidth: 252,
        minHeight: 700,
      }}
    >
      <div
        id="player"
        contentEditable
        style={{
          fontFamily: "fontemon",
          minWidth: 250,
          minHeight: 250,
          fontSize: 100,
          paddingLeft: 2,
          fontVariantLigatures: "discretionary-ligatures",
          backgroundColor: "white",
          color: "black",
          outline: `0px solid transparent`,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: -54,
          left: -81,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <img width="410" height="670" src="/assets/fontkid0001.png" />
      </div>
      <div
        style={{
          position: "absolute",
          top: 400,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "0px 0px 17px -1px #928AD8",
          borderRadius: 5,
          color: "black",
          padding: 10,
        }}
      >
        <div
          style={{
            maxWidth: 400,
          }}
        >
          <div>
            Type and keep typing. It's a font, but the font replaces what you
            type with the game! You can type here or you type directly in the
            game above!
          </div>
        </div>
        <textarea style={{ boxSizing: "border-box" }} id="area" />
        <div
          id="game-options"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <label htmlFor="game-style"> Presets: </label>
          <select id="game-style">
            <option value="Black and White">Black and White</option>
            <option value="Classic">Classic</option>
            <option value="Inverted">Inverted</option>
          </select>
          <label htmlFor="background-color">Background:</label>
          <input id="background-color" type="color" value="#FFFFFF" />
          <label htmlFor="text-color">"Text":</label>
          <input id="text-color" type="color" value="#000000" />
        </div>
      </div>
    </div>
  );
};
