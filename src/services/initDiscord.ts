import { Client, ClientOptions, GatewayIntentBits } from 'discord.js';
import { DiscordConfig, discordConfigDTO } from '../schemas/notifySchema';

class DiscordClient extends Client {
  discordConfig: DiscordConfig;

  constructor(options: ClientOptions, discordConfig?: DiscordConfig) {
    super(options);
    this.discordConfig = discordConfig as DiscordConfig;
  }

  setDiscordConfig(config: DiscordConfig) {
    this.discordConfig = config;
  }
}

export const discordClient = new DiscordClient({
  intents: [GatewayIntentBits.Guilds],
});

const LOGIN_TIMEOUT_MS = 10_000;

declare global {
  interface Discord {
    reportConfig: string;
  }
}

export async function initDiscordBot(JSONConfig: any) {
  const discordConfig = discordConfigDTO.parse(
    JSONConfig.discord_report_config,
  );

  discordClient.setDiscordConfig(discordConfig);
  // login
  await (async () => {
    discordClient.login(JSONConfig.discord_bot_token);

    const timeout = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Client login timed out'));
      }, LOGIN_TIMEOUT_MS);
    });

    const ready = new Promise<void>((resolve) => {
      discordClient.on('ready', () => {
        console.log(`Discord logged in as ${discordClient.user?.tag}`);
        resolve();
      });
    });

    return Promise.race([ready, timeout]);
  })();
}
