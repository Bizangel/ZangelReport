import { APIEndpoint } from '../common/types';
import { Request, Response } from 'express';
import { NotifyDiscordDTO } from '../schemas/discordSchemas';
import discordSendService from '../services/discordSendService';
import { discordClient } from '../services/initDiscord';

const discordNotify: APIEndpoint<NotifyDiscordDTO> = async (
  req: Request,
  res: Response,
  payload,
) => {
  switch (payload.channel) {
    case 'announce':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.announce_channel_id,
        '@here ' + payload.message,
      );
      break;

    case 'logs':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.logs_channel_id,
        payload.message,
      );
      break;

    case 'reports':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.reports_channel_id,
        payload.message,
      );
      break;

    case 'dm':
      await discordSendService.sendUserTextDM(
        discordClient.discordConfig.dm_owner_id,
        payload.message,
      );
      break;
  }

  return res.status(200).json({ success: true });
};

export default { discordNotify };
