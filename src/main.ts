import express from 'express';
import { Response, Request } from 'express';
import https from 'https';
import fs from 'fs';
import crypto from 'crypto';

const JSONConfig = JSON.parse(
  fs.readFileSync('serverconfig.json', { encoding: 'utf-8' }),
);

const secretAuthorizationToken = JSONConfig.authorization_token;

const jsonErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  res.status(400).send({ msg: 'Unable to parse request' });
};

function authenticationMiddleware(req: Request, res: Response, next: any) {
  // Check if the "Authorization" header exists in the request
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // If the header is missing or the token is incorrect, return a 401 Unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (
    !crypto.timingSafeEqual(
      Buffer.from(authHeader.trim()),
      Buffer.from(secretAuthorizationToken),
    )
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // If the token is correct, proceed to the next middleware or route
  next();
}

const app = express();
app.use(express.json());
app.use(jsonErrorHandler);
app.use(authenticationMiddleware);

app.post('/api/ping', (req: Request, res: Response) => {
  // processTransaction("")
  console.log('received ping with body: ', req.body);
  res.status(200).json({ msg: 'success' });
});

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
