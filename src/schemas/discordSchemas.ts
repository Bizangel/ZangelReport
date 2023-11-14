import { z } from 'zod';

export const notifyDiscordDTOZod = z.object({
  channel: z.enum(['logs', 'announce', 'reports', 'dm']),
  message: z.string(),
});
export type NotifyDiscordDTO = z.infer<typeof notifyDiscordDTOZod>;

export const discordConfigDTOZod = z.object({
  announce_channel_id: z.string(),
  dm_owner_id: z.string(),
  reports_channel_id: z.string(),
  logs_channel_id: z.string(),
});
export type DiscordConfigDTO = z.infer<typeof discordConfigDTOZod>;
