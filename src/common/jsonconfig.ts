import fs from 'fs';

const JSONConfig = JSON.parse(
  fs.readFileSync('serverconfig.json', { encoding: 'utf-8' }),
);

export default JSONConfig;
