import { LoginMiddleware } from '@app/core';
import { UserModule } from '@app/user';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DetectiveModule } from 'apps/detective/src/detective.module';

@Module({
  imports: [UserModule, DetectiveModule],
})
export class GameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('*');
  }
}
