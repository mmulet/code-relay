import { series, parallel } from "gulp";
import DevelopmentServer from "./gulp/DevelopmentServer";
import { compileGenerationTypescript } from "./gulp/compileGenerationTypescript";
import { generateFiles } from "./gulp/generateFiles";
import { watchJavascriptForGeneration } from "./gulp/watchJavascriptForGeneration";
import { watchCodeExamples } from "./gulp/watchCodeExamples";
import { runDevelopmentHTTPServer } from "./gulp/runDevelopmentHTTPServer";
import { compileClientSideTypescript } from "./gulp/compileClientSideTypescript";
import { watchClientSideTypescript } from "./gulp/watchClientSideTypescript";
import { watchGenerationTypescript } from "./gulp/watchGenerationTypescript";

/**
 * Use this to build the site
 */
export const build = series(
  parallel(compileGenerationTypescript, compileClientSideTypescript),
  generateFiles
);

const devServer = new DevelopmentServer();

/**
 * Use this to develop the site
 */
export const dev = parallel(
  /**
   * We will watch the typescript in ./scripts/src/clientSide
   */
  watchClientSideTypescript,
  /**
   * We will watch the typescript in ./scripts/src/fileGenerators
   */
  watchGenerationTypescript,
  /**
   * The typescript compiler will watch the javascript generated from the typescript.
   * Then it will generate the HTML from javascript
   */
  watchJavascriptForGeneration(devServer),
  /**
   * Generate files on code Example change
   */
  watchCodeExamples(devServer),
  /**
   * Run a simple http server to server the html. It also injects a live reload script into
   * every http page to make development quicker
   */
  runDevelopmentHTTPServer(devServer)
);

export default dev;
