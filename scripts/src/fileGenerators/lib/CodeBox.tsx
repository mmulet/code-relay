import React, { FunctionComponent } from "react";

export const codeBoxColor = "rgb(40, 44, 52)";

const CodeBox: FunctionComponent<{
  readonly style?: React.CSSProperties;
  readonly noSnow?: boolean;
  readonly wallId?: WallId;
}> = ({ style: newStyle, children, noSnow, wallId }) => {
  const snowBoxClass: SnowBoxClass = "snow-box";
  return (
    <div
      id={wallId}
      className={`fit code-box${noSnow ? "" : " " + snowBoxClass}`}
      style={{
        backgroundColor: codeBoxColor,
        ...newStyle,
      }}
    >
      {children}
    </div>
  );
};
export default CodeBox;
