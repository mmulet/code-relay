import React from "react";
import ReactDomServer from "react-dom/server";
import { writeFile } from "fs/promises";
import { basename } from "path";
import { html } from "./html";
import FileGenerator from "./FileGenerator";
import generationPath from "./generationPath";

export default async ({
  fileGenerator,
  moduleName,
}: {
  readonly fileGenerator: FileGenerator;
  readonly moduleName: string;
}) => {
  switch (fileGenerator.fileType) {
    case "ignore":
      return true;
    case "html": {
      const { title, head, bodyEnd, component, fileName } = fileGenerator;

      if (
        fileName == undefined ||
        component == undefined ||
        title == undefined
      ) {
        return Promise.reject(
          `Cannot generate ${fileGenerator}. Missing default export, or the title or fileName export`
        );
      }
      const renderedElement = ReactDomServer.renderToString(
        React.createElement(component)
      );
      await writeFile(
        generationPath(fileName),
        html({
          title,
          body: renderedElement,
          head,
          bodyEnd,
          moduleName: `${basename(moduleName, ".js")}.tsx`,
        })
      );
      return true;
    }

    case "content": {
      const { fileName, content } = fileGenerator;
      if (fileName == undefined || content == undefined) {
        return Promise.reject(
          `Cannot generate ${fileGenerator}. Missing default export, or the title or fileName export`
        );
      }
      await writeFile(generationPath(fileName), content);
      return true;
    }
    default:
      neverDefault(fileGenerator);
      return false;
  }
};
const neverDefault = (_x: never) => {
  throw new Error("Default case that should never happen");
};
