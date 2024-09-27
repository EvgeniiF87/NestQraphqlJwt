import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputValidationPipe } from './pipe/input.validation';
import * as cookieParser from 'cookie-parser';

//TODO создать модуль по cron задачам
//TODO создать сущность для статистики просмотров событий и мест клиента
//TODO создать крон который будет накручивать просмотры у событий и мест
//TODO создать updateResponse

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new InputValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });
  await app.listen(3000);
}
bootstrap();
