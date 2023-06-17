import { Module } from '@nestjs/common';

import { DetectiveController } from './detective.controller';
import { DetectiveService } from './detective.service';

@Module({
  controllers: [DetectiveController],
  providers: [DetectiveService],
})
export class DetectiveModule {}
