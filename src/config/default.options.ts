import { join } from 'path';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });

const defaultOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  schema: process.env.SCHEMA,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  entities: ['dist/**/entities/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true,
};

export default defaultOptions;
