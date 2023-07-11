import { User } from '@app/entity';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { FindOptionsWhere, Repository } from 'typeorm';

import { LoginPayload } from './user.dto';
import { UserInfoProvider } from './user-info.provider';

@Injectable()
export abstract class UserService {
  constructor(
    protected readonly userRepository: Repository<User>,
    private userInfoProvider: UserInfoProvider
  ) {}

  abstract getCurrentUser(): Promise<User>;

  async searchExistingUsers() {
    const conditions: FindOptionsWhere<User>[] = [];
    if (this.userInfoProvider.userID) {
      conditions.push({
        id: this.userInfoProvider.userID,
      });
    }

    if (this.userInfoProvider.wxOpenid) {
      conditions.push({
        wxOpenid: this.userInfoProvider.wxOpenid,
      });
    }
    if (conditions.length === 0) {
      return null;
    }
    const existingUser = await this.userRepository.findOne({
      where: conditions,
    });
    return existingUser;
  }

  async login(payload: LoginPayload): Promise<User> {
    const existingUser = await this.searchExistingUsers();
    const user = existingUser ?? this.userRepository.create();

    Object.assign(user, pick(payload, ['name', 'avatarUrl', 'wxOpenid']));

    return this.userRepository.save(user);
  }
}
