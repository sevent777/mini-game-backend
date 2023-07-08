import { ConfigModule, ConfigService } from '@app/config';
import { DBName } from '@app/constant';
import { LoginMiddleware } from '@app/core';
import { AnswerRecord, BaseTypeOrmModuleOptions, DetectiveUser } from '@app/entity';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';
import { DetectiveUserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...BaseTypeOrmModuleOptions,
      database: DBName.detective,
      name: DBName.detective,
      entities: [AnswerRecord, DetectiveUser],
    }),
    TypeOrmModule.forFeature([AnswerRecord], DBName.detective),
    ConfigModule,
    DetectiveUserModule,
  ],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
  exports: [DetectiveUserModule, TypeOrmModule],
})
export class DetectiveModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('*');
  }
}
