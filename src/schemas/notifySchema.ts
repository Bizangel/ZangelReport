import { z } from 'zod';

export const notifyRequestDTO = z.object({
  channel: z.enum(['logs', 'announce', 'reports', 'dm', 'push']),
  message: z.string(),
  iso_timestamp: z.string(),
});
export type NotifyRequest = z.infer<typeof notifyRequestDTO>;

export const discordConfigDTO = z.object({
  announce_channel_id: z.string(),
  dm_owner_id: z.string(),
  reports_channel_id: z.string(),
  logs_channel_id: z.string(),
});

export type DiscordConfig = z.infer<typeof discordConfigDTO>;
