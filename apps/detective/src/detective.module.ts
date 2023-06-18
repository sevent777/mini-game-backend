import { ConfigModule, ConfigService } from '@app/config';
import { Module } from '@nestjs/common';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';

@Module({
  imports: [ConfigModule],
  controllers: [DetectiveController],
  providers: [ConfigService, DetectiveService],
})
export class DetectiveModule {}
