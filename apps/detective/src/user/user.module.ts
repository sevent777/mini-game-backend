import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { UserInfoProvider } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveUserController } from './user.controller';
import { DetectiveUserProvider, DetectiveUserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetectiveUser], DBName.detective)],
  providers: [DetectiveUserProvider, DetectiveUserService, UserInfoProvider],
  controllers: [DetectiveUserController],
  exports: [DetectiveUserProvider, UserInfoProvider],
})
export class DetectiveUserModule {}
