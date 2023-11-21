import notifyController from '../controllers/notifyController';
import { notifyRequestDTO } from '../schemas/notifySchema';
import { ZodRouter } from '../middlewares/zodValidatorMiddleware';

var notifyRouter = new ZodRouter();

notifyRouter.route(
  'post',
  '/notify',
  notifyController.notify,
  notifyRequestDTO,
);

export default notifyRouter;
