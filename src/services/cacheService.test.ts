// import JSONConfig from '../common/jsonconfig';
import { NotifyRequest } from '../schemas/notifySchema';
import cacheService from './cacheService';
import fs from 'fs';

// jest.mock('../common/jsonconfig', () => ({
//   __esModule: true, // this property makes it work
//   default: {
//     myconfig: 'sampleval',
//   },
// }));

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

  it('Dumps tests properly', async () => {
    // act
    await cacheService.appendMessage(EXAMPLE_REQUEST);
    await cacheService.dumpCache(TEST_FILEPATH);

    // assert
    const contents = fs.readFileSync(TEST_FILEPATH, { encoding: 'utf-8' });
    const res = JSON.parse(atob(contents));
    expect(res).toEqual(EXAMPLE_REQUEST);
  });

  it('Pops tests properly', async () => {
    await cacheService.appendMessage(EXAMPLE_REQUEST);
    await cacheService.dumpCache(TEST_FILEPATH);

    // act
    const popped = await cacheService.popAndReadCacheDump(TEST_FILEPATH);

    expect(popped[0]).toEqual(EXAMPLE_REQUEST);
  });
});
