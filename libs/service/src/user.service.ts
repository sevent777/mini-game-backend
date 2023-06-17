import { User } from '@app/entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { FindOptionsWhere, Repository } from 'typeorm';

import { LoginPayload } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

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
    const user = existingUser ?? new User();

    Object.assign(user, pick(payload, ['name', 'avatarUrl', 'wxOpenid']));

    return this.userRepository.save(user);
  }
}
