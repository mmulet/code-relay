import React, { FunctionComponent } from "react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { docsDirectory } from "./directories";

const SpriteSheetPNGImage: FunctionComponent<{ readonly src: string }> = ({
  src,
}) => {
  const fileBuffer = readFileSync(
    resolve(docsDirectory, `assets/anim/${src}`)
  );
  return (
    <img
      style={{
        display: "none",
      }}
      id={src.split(".").join("-")}
      src={`assets/anim/${src}`}
      /**
       * grab the height from the IHDR image header
       * @see https://www.w3.org/TR/PNG/#11IHDR
       */
      width={fileBuffer.readUInt32BE(16)}
      height={fileBuffer.readUInt32BE(20)}
    />
  );
};

export default SpriteSheetPNGImage;
