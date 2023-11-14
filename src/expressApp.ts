import express from 'express';
import jsonErrorHandler from './middlewares/jsonErrorHandler';
import useHeaderAuthenticationMiddleware from './middlewares/headerAuthenticationMiddleware';
import discordRouter from './routes/discordReport';
import { Router } from 'express';
// import { discordReport } from './controllers/discordReport';

const useExpressApp = (JSONConfig: any) => {
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

  // routers
  const apiRouter = Router();

  apiRouter.use('/discord', discordRouter.getRouter());
  app.use('/api', apiRouter);

  return app;
};

export default useExpressApp;
