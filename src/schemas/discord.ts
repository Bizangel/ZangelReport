import { z } from 'zod';

export const notifyDiscordDTOZod = z.object({
  message: z.string(),
});

export type notifyDiscordDTO = z.infer<typeof notifyDiscordDTOZod>;

export const anotherDTOZod = z.object({
  another: z.string(),
});

export type anotherDTO = z.infer<typeof notifyDiscordDTOZod>;
