import { ConfigModule, ConfigService } from '@app/config';
import { DBName } from '@app/constant';
import { AnswerRecord, BaseTypeOrmModuleOptions, DetectiveUser } from '@app/entity';
import { Module } from '@nestjs/common';
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
    DetectiveUserModule,
    ConfigModule,
  ],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
  exports: [DetectiveUserModule, TypeOrmModule],
})
export class DetectiveModule {}
