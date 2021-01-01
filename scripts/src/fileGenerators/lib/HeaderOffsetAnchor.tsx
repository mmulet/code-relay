import React from "react";
/**
 * Use this anchor to refer to content with an appropriate
 * offset for the fixed header. 
 * (This way no content is hidden by the header)
 */
export default ({ id }: { readonly id: string }) => (
  <a
    id={id}
    style={{
      display: "block",
      position: "relative",
      top: -60,
      visibility: "hidden",
    }}
  ></a>
);
