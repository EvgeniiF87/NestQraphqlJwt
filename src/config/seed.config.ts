import { join } from 'path';
import { config } from 'dotenv';
import defaultOptions from './default.options';

config({ path: join(process.cwd(), '.env') });

const options = {
  ...defaultOptions,
  factories: ['dist/database/factories/**/*.js'],
  seeds: ['dist/database/seeds/**/*.js'],
};

export default options;
