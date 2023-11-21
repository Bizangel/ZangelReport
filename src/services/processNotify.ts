import { NotifyRequest } from '../schemas/notifySchema';
import discordSendService from './discordSendService';
import { discordClient } from './initDiscord';

const processNotify = async (message: NotifyRequest) => {
  switch (message.channel) {
    case 'announce':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.announce_channel_id,
        '@here ' + message.message,
      );
      break;

    case 'logs':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.logs_channel_id,
        message.message,
      );
      break;

    case 'reports':
      await discordSendService.sendTextChannelMessage(
        discordClient.discordConfig.reports_channel_id,
        message.message,
      );
      break;

    case 'dm':
      await discordSendService.sendUserTextDM(
        discordClient.discordConfig.dm_owner_id,
        message.message,
      );
      break;
    case 'push':
      throw new Error('Push notifications not implemented yet.');
  }

  return;
};

export default processNotify;
