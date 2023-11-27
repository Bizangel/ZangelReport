import { APIEndpoint } from '../common/types';
import { Request, Response } from 'express';
import { NotifyRequest } from '../schemas/notifySchema';
// import discordSendService from '../services/discordSendService';
// import { discordClient } from '../services/initDiscord';
import processNotify from '../services/processNotify';
import cacheService from '../services/cacheService';
// import JSONConfig from '../common/JSONConfig';
// import sleep from '../common/sleep';

// follows a best effort approach.
const notify: APIEndpoint<NotifyRequest> = async (
  req: Request,
  res: Response,
  payload,
) => {
  // try to send it right away...
  try {
    await processNotify(payload);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Failed to process message: ${payload}`);
    console.error(error);
  }

  // if failed append to cache. Will be picked up and retried later.
  cacheService.appendMessage(payload);

  return res.status(200).json({ success: true });
};

export default { notify };
