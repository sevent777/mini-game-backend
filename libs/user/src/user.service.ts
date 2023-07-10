import { User } from '@app/entity';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { FindOptionsWhere, Repository } from 'typeorm';

import { LoginPayload } from './user.dto';

@Injectable()
export abstract class UserService {
  constructor(protected readonly userRepository: Repository<User>) {}

  abstract getCurrentUser(): Promise<User>;

  async searchExistingUsers(payload: LoginPayload) {
    const conditions: FindOptionsWhere<User>[] = [];
    if (payload.id) {
      conditions.push({
        id: payload.id,
      });
    }
    if (payload.wxOpenid) {
      conditions.push({
        wxOpenid: payload.wxOpenid,
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
    const existingUser = await this.searchExistingUsers(payload);
    const user = existingUser ?? this.userRepository.create();

    Object.assign(user, pick(payload, ['name', 'avatarUrl', 'wxOpenid']));

    return this.userRepository.save(user);
  }
}
