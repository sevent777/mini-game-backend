import { ConfigModule, ConfigService } from '@app/config';
import { DBName } from '@app/constant';
import { AnswerRecord, getTypeormRootModule } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';

@Module({
  imports: [
    ConfigModule,
    getTypeormRootModule(DBName.detective, [AnswerRecord]),
    TypeOrmModule.forFeature([AnswerRecord]),
  ],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
})
export class DetectiveModule {}
