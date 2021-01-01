import { watch, series } from "gulp";
import DevelopmentServer from "./DevelopmentServer";
import { generateFiles } from "./generateFiles";
import { livereload } from "./livereload";

export function watchJavascriptForGeneration(devServer: DevelopmentServer) {
  return function watchJavascriptForGeneration() {
    watch(
      ["scripts/compiled/**/*"],
      {
        ignoreInitial: false,
      },
      series(generateFiles, livereload(devServer))
    );
  };
}
