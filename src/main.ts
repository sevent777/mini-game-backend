import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { port } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
