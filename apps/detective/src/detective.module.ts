import { ConfigModule, ConfigService } from '@app/config';
import { DBName } from '@app/constant';
import { AnswerRecord, BaseTypeOrmModuleOptions } from '@app/entity';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...BaseTypeOrmModuleOptions,
      database: DBName.detective,
      name: DBName.detective,
      entities: [AnswerRecord],
    }),
    TypeOrmModule.forFeature([AnswerRecord], DBName.detective),
    ConfigModule,
    UserModule,
  ],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
})
export class DetectiveModule {}
