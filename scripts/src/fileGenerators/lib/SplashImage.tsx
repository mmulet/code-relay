import React from "react";
import { pageBackgroundColor } from "./siteConstants";

export default () => (
  <>
    <div
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        backgroundColor: "black",
        display: "block",
        marginTop: 30,
      }}
    >
      <div
        className="fit"
        style={{
          margin: "0 auto",
          position: "relative",
        }}
      >
        <video
          style={{
            maxWidth: "100%",
            display: "block",
          }}
          width="800"
          height="600"
          autoPlay
          muted
          loop
          playsInline
          title="Code Relay"
        >
          <source
            src="assets/webm.webm"
            type="video/webm"
          />
          <source src="assets/mp4.mp4" type="video/mp4" />
        </video>

        <div
          className="splash-code"
          style={{
            bottom: 0,
            textAlign: "center",
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <h1>
            <span>Rapid fire</span>{" "}
            <span
              style={{
                color: "#4F7EFF",
              }}
            >
              open source
            </span>{" "}
            coding.
          </h1>
          <h1>
            What can{" "}
            <span
              style={{
                color: "#F4FF70",
              }}
            >
              you
            </span>{" "}
            do in{" "}
            <span
              style={{
                color: "#8465FF",
              }}
            >
              5
            </span>{" "}
            minutes?
          </h1>
        </div>
      </div>
    </div>
    <div
      style={{
        minWidth: "100%",
        minHeight: 100,
        backgroundImage: `linear-gradient(black, ${pageBackgroundColor})`,
      }}
    ></div>
  </>
);
