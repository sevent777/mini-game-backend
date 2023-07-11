import { LoginMiddleware } from '@app/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DetectiveModule } from 'apps/detective/src/detective.module';

@Module({
  imports: [DetectiveModule],
})
export class GameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).exclude('/cms/(.*)').forRoutes('*');
  }
}
