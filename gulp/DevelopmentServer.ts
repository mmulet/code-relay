import express from "express";
import { readFile, writeFile } from "fs/promises";
import { resolve, extname } from "path";
import tmp from "tmp";

export default class DevelopmentServer {
  reloadId = 0;
  /**
   * having some problems with reloading,
   * which will reload, way too many times
   */
  reloadTimeout = 0;

  lastFailedReloadId = -1;
  setShouldReload = () => {
    this.reloadId++;
    this.reloadTimeout = 0
  };

  port = 5000;
  runServer = (options?: { readonly port?: number }) => {
    const { port: inputPort } = options ?? {};
    this.port = inputPort ?? this.port;
    const app = express();

    const shouldReloadPath = "shouldReload";
    const shouldReloadValue = "shouldReload";
    const reloadTimeoutValue = "reloadTimeout"

    app.get(`/${shouldReloadPath}`, (request, response) => {
      response.setHeader("Cache-Control", "no-store");
      const maybeRequestReloadId = request.query["reloadId"]
      const requestedReloadId = typeof maybeRequestReloadId == "string" ? parseInt(maybeRequestReloadId) :0;
      const shouldReload = this.reloadId !== requestedReloadId
      if(this.lastFailedReloadId == requestedReloadId){
        this.reloadTimeout = this.reloadTimeout == 0 ? 50 : 2*this.reloadTimeout
      }
      response.json({
        [shouldReloadValue]: shouldReload,
        [reloadTimeoutValue]: !shouldReload ? 0 : this.reloadTimeout
      });
      if(shouldReload){
        this.lastFailedReloadId = requestedReloadId
      }
    });

    app.post(`/setReload`, (_, response) => {
      this.setShouldReload();
      response.send("OK");
    });

    app.get("*", async (request, response) => {
      try {
        response.setHeader("Cache-Control", "no-store");
        const url = new URL(`http://localhost:${this.port}${request.url}`);
        if (url.pathname == "/") {
          url.pathname = "/index.html";
        }
        const fileSystemPath = resolve(__dirname, `../public${url.pathname}`);
        if (!url.pathname.endsWith("html")) {
          response.sendFile(fileSystemPath);
          return;
        }
        const tempFilePromise = new Promise<string>((resolve, reject) => {
          tmp.file((err, path) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(path);
          });
        });

        const file = (await readFile(fileSystemPath)).toString();
        const injectedFile = file.replace(
          "</body>",
          `
      <script>
      console.log("revision #${this.reloadId}");
      let waitingForFetch = false
      setInterval(async () => {
        if(waitingForFetch){
          console.log("fetch wait")
          return
        }
        const headers = new Headers();
        headers.append('cache-control', 'no-store')
        const request = new Request("/${shouldReloadPath}?reloadId=${this.reloadId}")

        waitingForFetch = true;
        const { ${shouldReloadValue}, ${reloadTimeoutValue} } = await (await fetch(request, {
          method: 'GET',
          headers
        })).json();
        if (!${shouldReloadValue}) {
          waitingForFetch = false;
          return;
        }
        if(${reloadTimeoutValue} <= 0){
          location.reload();
          return;
        }
        console.log("waiting for timeout", ${reloadTimeoutValue})
        setTimeout(() => {
          location.reload();
        }, ${reloadTimeoutValue});
        
      }, 100);
      </script>
      </body>`
        );
        const tempFileName = await tempFilePromise;
        await writeFile(tempFileName, injectedFile);

        response.contentType(extname(fileSystemPath));
        response.sendFile(tempFileName);
        return;
      } catch (err) {
        response.sendStatus(500);
        console.error(err);
      }
    });

    app.listen(this.port, () => {
      console.log(`Page served at http://localhost:${this.port}`);
    });
  };
}

if (require.main == module) {
  new DevelopmentServer().runServer();
}
