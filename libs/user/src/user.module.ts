import { User } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInfoProvider } from './user-info.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserInfoProvider],
  controllers: [UserController],
  exports: [UserService, UserInfoProvider],
})
export class UserModule {}
