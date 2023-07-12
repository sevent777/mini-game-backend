import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveUserController } from './user.controller';
import { DetectiveUserProvider } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetectiveUser], DBName.detective)],
  providers: [DetectiveUserProvider],
  controllers: [DetectiveUserController],
  exports: [DetectiveUserProvider],
})
export class DetectiveUserModule {}
