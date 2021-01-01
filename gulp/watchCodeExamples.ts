import { watch, series } from "gulp";
import DevelopmentServer from "./DevelopmentServer";
import { generateFiles } from "./generateFiles";
import { livereload } from "./livereload";

export function watchCodeExamples(
  devServer: DevelopmentServer
) {
  return function watchCodeExamples() {
    watch(
      "scripts/codeExamples/*",
      {
        ignoreInitial: false,
      },
      series(
        generateFiles,
        livereload(devServer)
      )
    )
  };
}
