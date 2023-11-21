import express from 'express';
import jsonErrorHandler from './middlewares/jsonErrorHandler';
import useHeaderAuthenticationMiddleware from './middlewares/headerAuthenticationMiddleware';
import { initDiscordBot } from './services/initDiscord';
import notifyRouter from './routes/notifyRoute';

const useExpressApp = async (JSONConfig: any) => {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use(jsonErrorHandler);

  if (JSONConfig.reporter_authorization_token)
    app.use(
      useHeaderAuthenticationMiddleware(
        JSONConfig.reporter_authorization_token,
      ),
    );

  await initDiscordBot(JSONConfig);

  app.use('/api', notifyRouter.getRouter());

  return app;
};

export default useExpressApp;
