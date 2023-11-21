import { NotifyRequest } from '../schemas/notifySchema';
import cacheService from './cacheService';
import fs from 'fs';

const EXAMPLE_REQUEST: NotifyRequest = {
  message: 'Example Message',
  channel: 'dm',
  iso_timestamp: '2023-11-21T03:35:30.462Z',
};

const TEST_FILEPATH = 'testing_cache_mock.temp.txt';

describe('cacheService tests', () => {
  afterEach(() => {
    // clean up any file
    fs.rmSync(TEST_FILEPATH, { force: true });
  });

  it('Stores tests properly', async () => {
    // act
    await cacheService.appendTocache(EXAMPLE_REQUEST, TEST_FILEPATH);

    // assert
    const contents = fs.readFileSync(TEST_FILEPATH, { encoding: 'utf-8' });
    const res = JSON.parse(atob(contents));
    expect(res).toEqual(EXAMPLE_REQUEST);
  });

  it('Pops tests properly', async () => {
    // act
    await cacheService.appendTocache(EXAMPLE_REQUEST, TEST_FILEPATH);
    const popped = await cacheService.popCache(TEST_FILEPATH);

    expect(popped[0]).toEqual(EXAMPLE_REQUEST);
  });
});
