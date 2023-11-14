import { TextChannel } from 'discord.js';
import { discordClient } from './initDiscord';

const discordSendService = {
  sendTextChannelMessage: async (channelID: string, message: string) => {
    try {
      // check cache
      let channel = discordClient.channels.cache.get(channelID) as TextChannel;
      // if not in cache then fetch
      if (!channel) {
        channel = (await discordClient.channels.fetch(
          channelID,
        )) as TextChannel;
      }

      if (!channel) {
        throw new Error('Channel not found! Check permissions');
      }

      await channel.send(message);
    } catch (err) {
      console.error(err);
      console.log('Unable to find channel');
    }
  },

  sendUserTextDM: async (userID: string, message: string) => {
    try {
      await discordClient.users.send(userID, message);
    } catch (err) {
      console.error(err);
      console.log('Unable to message user');
    }
  },
};

export default discordSendService;
