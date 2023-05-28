import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { port } from './constant';
import { AllExceptionsFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
