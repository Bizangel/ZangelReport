import discordReportController from '../controllers/discordReportController';
import { notifyDiscordDTOZod } from '../schemas/discordSchemas';
import { ZodRouter } from '../middlewares/zodValidatorMiddleware';

var discordRouter = new ZodRouter();

discordRouter.route(
  'post',
  '/notify',
  discordReportController.discordNotify,
  notifyDiscordDTOZod,
);

export default discordRouter;
