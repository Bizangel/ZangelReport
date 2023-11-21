import { TextChannel } from 'discord.js';
import { discordClient } from './initDiscord';

const discordSendService = {
  sendTextChannelMessage: async (channelID: string, message: string) => {
    // check cache
    let channel = discordClient.channels.cache.get(channelID) as TextChannel;
    // if not in cache then fetch
    if (!channel) {
      channel = (await discordClient.channels.fetch(channelID)) as TextChannel;
    }

    if (!channel) {
      throw new Error('Channel not found! Check permissions');
    }

    await channel.send(message);
  },

  sendUserTextDM: async (userID: string, message: string) => {
    await discordClient.users.send(userID, message);
  },
};

export default discordSendService;
