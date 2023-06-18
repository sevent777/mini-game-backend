import { Module } from '@nestjs/common';
import { DetectiveModule } from 'apps/detective/src/detective.module';

@Module({
  imports: [DetectiveModule],
})
export class GameModule {}
