import https from 'https';
import fs from 'fs';
import useExpressApp from './expressApp';

const JSONConfig = JSON.parse(
  fs.readFileSync('serverconfig.json', { encoding: 'utf-8' }),
);

const app = useExpressApp(JSONConfig);

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
