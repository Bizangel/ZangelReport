import { NotifyRequest, notifyRequestDTO } from '../schemas/notifySchema';
import fs from 'fs';

const CACHE_FILE = 'message_cache.temp.txt';

const cacheService = {
  appendTocache: async (messsage: NotifyRequest, filepath = CACHE_FILE) => {
    const b64 = btoa(JSON.stringify(messsage));

    await new Promise<void>((resolve, reject) =>
      fs.appendFile(filepath, b64, { encoding: 'utf8' }, (err) => {
        if (err) reject(err);
        resolve();
      }),
    );
  },

  popCache: async (filepath = CACHE_FILE): Promise<NotifyRequest[]> => {
    const fcontent = await new Promise<string>((resolve, reject) =>
      fs.readFile(filepath, { encoding: 'utf8' }, (err, content) => {
        if (err) reject(err);
        resolve(content);
      }),
    );

    const splitted = fcontent.split('\n');

    return splitted.map((line) => {
      const parseRes = notifyRequestDTO.safeParse(JSON.parse(atob(line)));
      if (!parseRes.success) throw new Error('Corrupted Cache');
      return parseRes.data;
    });
  },
};

export default cacheService;
