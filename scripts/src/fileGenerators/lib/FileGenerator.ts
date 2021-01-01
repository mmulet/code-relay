import React from "react";

export type FileGenerator =
  | HTMLFileGenerator
  | ContentFileGenerator
  | IgnoredFile;

export default FileGenerator;

/**
 * An html file
 */
export interface HTMLFileGenerator {
  /**
   * If the fileType is html, generate this
   * as an html using the html function.
   * Otherwise, @see
   * @default "html"
   */
  readonly fileType: "html";

  /**
   * The generated fileName. Like index.html.
   * The file is saved in ./docs/
   */
  readonly fileName: string;

  /**
   * Title for the html file inserted in the head
   */
  readonly title: string;

  /**
   * HTML string for the head, inserted at the
   * end of the head element
   */
  readonly head?: string;

  /**
   * HTML string fo content inserted at
   * the end of the body
   */
  readonly bodyEnd?: string;
  /**
   * The content of the html file.
   * The is rendered with ReactDomServer.renderToString
   * and inserted into the document body
   */
  readonly component: React.FunctionComponent | React.ComponentClass;
}
/**
 * A file that will copy its content verbatim
 * without another function or transformation.
 */
export interface ContentFileGenerator {
  /**
   * If the fileType is html, generate this
   * as an html using the html function.
   * Otherwise, @see
   * @default "html"
   */
  readonly fileType: "content";

  /**
   * The generated fileName. Like index.html.
   */
  readonly fileName: string;

  /**
   * The file is exported as a string,
   * the string is written verbatim to the output file
   */
  readonly content: string;
}

export interface IgnoredFile {
  /**
   * This is not a generated file
   */
  readonly fileType: "ignore";
}
