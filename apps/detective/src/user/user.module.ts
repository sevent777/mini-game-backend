import { DBName } from '@app/constant';
import { DetectiveUser } from '@app/entity';
import { UserInfoProvider, UserService } from '@app/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetectiveUserController } from './user.controller';
import { DetectiveUserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetectiveUser], DBName.detective)],
  providers: [
    {
      provide: UserService,
      useClass: DetectiveUserService,
    },
    UserInfoProvider,
  ],
  controllers: [DetectiveUserController],
  exports: [
    {
      provide: UserService,
      useClass: DetectiveUserService,
    },
    UserInfoProvider,
  ],
})
export class DetectiveUserModule {}
