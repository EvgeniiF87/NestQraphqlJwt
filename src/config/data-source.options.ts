import { join } from 'path';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  schema: process.env.SCHEMA,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  // entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(options);

export default dataSource;
