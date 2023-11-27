import JSONConfig from '../common/jsonconfig';
import sleep from '../common/sleep';
import { NotifyRequest, notifyRequestDTO } from '../schemas/notifySchema';
import fs from 'fs';
import processNotify from './processNotify';

const CACHE_FILE = 'message_cache.temp.txt';

const _notifyMessageQueue: NotifyRequest[] = [];

export const startQueueAsyncProcess = async () => {
  while (true) {
    await sleep(JSONConfig.retry_interval_seconds * 1000);

    if (_notifyMessageQueue.length === 0) continue;

    const tempQueue = [..._notifyMessageQueue];
    _notifyMessageQueue.length = 0; // clear queue

    while (tempQueue.length > 0) {
      const msgele = tempQueue.shift() as NotifyRequest;

      try {
        await processNotify(msgele);
      } catch (err) {
        // failed re-add
        _notifyMessageQueue.push(msgele);
      }
    }
  }
};

const cacheService = {
  appendMessage: async (message: NotifyRequest) => {
    _notifyMessageQueue.push(message);
  },

  dumpCache: async (filepath = CACHE_FILE) => {
    // const b64 = btoa(JSON.stringify(messsage));
    const b64encoded = _notifyMessageQueue.map((e) => btoa(JSON.stringify(e)));
    const b64encodedfcontent = b64encoded.join('\n');

    await new Promise<void>((resolve, reject) =>
      fs.appendFile(
        filepath,
        b64encodedfcontent,
        { encoding: 'utf8' },
        (err) => {
          if (err) reject(err);
          resolve();
        },
      ),
    );
  },

  popAndReadCacheDump: async (
    filepath = CACHE_FILE,
  ): Promise<NotifyRequest[]> => {
    const fcontent = await new Promise<string>((resolve, reject) =>
      fs.readFile(filepath, { encoding: 'utf8' }, (err, content) => {
        if (err) reject(err);
        resolve(content);
      }),
    );

    const splitted = fcontent
      .split('\n')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    return splitted.map((line) => {
      const parseRes = notifyRequestDTO.safeParse(JSON.parse(atob(line)));
      if (!parseRes.success) throw new Error('Corrupted Cache');
      return parseRes.data;
    });
  },
};

export default cacheService;
