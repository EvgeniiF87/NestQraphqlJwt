import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('HOST'),
    username: config.get('USERNAME'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE'),
    port: config.get('PORT'),
    entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    logging: false,
  }),
};
