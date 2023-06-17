import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { ConfigService } from '@app/service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationType, Configuration])],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
})
export class DetectiveModule {}
