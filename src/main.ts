import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { TransformInterceptor } from 'core';

import { AppModule } from './app.module';
import { port } from './constant';
import { AllExceptionsFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
