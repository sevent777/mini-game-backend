import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPayload } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async save(payload: UserPayload): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {
        wxOpenid: payload.wxOpenid,
      },
    });
    const user = existingUser ?? new User();

    user.name = payload.name;
    user.avatarUrl = payload.avatarUrl;
    user.wxOpenid = payload.wxOpenid;

    return this.userRepository.save(user);
  }
}
