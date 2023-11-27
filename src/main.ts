import https from 'https';
import useExpressApp from './expressApp';
import JSONConfig from './common/jsonconfig';
import fs from 'fs';
import { startQueueAsyncProcess } from './services/cacheService';

async function main() {
  // const flushCache =
  const app = await useExpressApp(JSONConfig);

  startQueueAsyncProcess();

  if (JSONConfig.https) {
    const certContents = fs.readFileSync(JSONConfig.https_cert_path);
    const keyContents = fs.readFileSync(JSONConfig.https_key_path);
    https
      .createServer(
        {
          key: keyContents,
          cert: certContents,
        },
        app,
      )
      .listen(JSONConfig.bind_port, JSONConfig.bind_address, () => {
        console.log(
          `Server listening on port https://${JSONConfig.bind_address}:${JSONConfig.bind_port}`,
        );
      });
  } else {
    app.listen(JSONConfig.bind_port, JSONConfig.bind_address, () => {
      console.log(
        `Server listening on port http://${JSONConfig.bind_address}:${JSONConfig.bind_port}`,
      );
    });
  }
}

main();
