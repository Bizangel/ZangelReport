import { APIEndpoint } from '../common/types';
import { Request, Response } from 'express';

import { notifyDiscordDTO } from '../schemas/discord';

const discordGet: APIEndpoint = async (req: Request, res: Response) => {
  return res.status(200).send('thanks for getting me');
};

const discordNotify: APIEndpoint<notifyDiscordDTO> = async (
  req: Request,
  res: Response,
  body,
) => {
  console.log(body);
  console.log('hello');
  return res.status(200).send('hello');
};

export default { discordNotify, discordGet };
