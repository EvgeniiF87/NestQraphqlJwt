import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import defaultOptions from './default.options';

config({ path: join(process.cwd(), '.env') });

export const options: DataSourceOptions = {
  ...defaultOptions,
  entities,
  migrations: [join(process.cwd(), 'src', 'database', 'migrations', '*.ts')],
};

const dataSource = new DataSource(options);

export default dataSource;
