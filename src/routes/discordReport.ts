import discordReportController from '../controllers/discordReportController';
import { notifyDiscordDTOZod } from '../schemas/discord';
import { ZodRouter } from '../middlewares/zodValidatorMiddleware';

var discordRouter = new ZodRouter();

discordRouter.route('get', '/getNotify', discordReportController.discordGet);
discordRouter.route(
  'post',
  '/notify',
  discordReportController.discordNotify,
  notifyDiscordDTOZod,
);

export default discordRouter;
