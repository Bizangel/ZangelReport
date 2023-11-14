import express from 'express';
import jsonErrorHandler from './middlewares/jsonErrorHandler';
import useHeaderAuthenticationMiddleware from './middlewares/headerAuthenticationMiddleware';
import { Router } from 'express';
import { initDiscordBot } from './services/initDiscord';
import discordRouter from './routes/discordReportRoutes';

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

  // routers
  const apiRouter = Router();

  apiRouter.use('/discord', discordRouter.getRouter());
  app.use('/api', apiRouter);

  return app;
};

export default useExpressApp;
