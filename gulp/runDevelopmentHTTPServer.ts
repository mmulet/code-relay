import DevelopmentServer from "./DevelopmentServer";

export function runDevelopmentHTTPServer(devServer: DevelopmentServer) {
  return function runDevelopmentHTTPServer() {
    const port = parseInt(process.env["CODE_RELAY_DEV_PORT"] ?? "")
    devServer.runServer({
        port: isNaN(port) ? undefined : port
    });
  };
}
