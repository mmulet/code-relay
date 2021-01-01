import DevelopmentServer from "./DevelopmentServer";


export function livereload(devServer: DevelopmentServer) {
  return function livereload(cb: any) {
    devServer.setShouldReload();
    cb();
  };
}
