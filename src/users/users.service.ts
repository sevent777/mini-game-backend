import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginPayload } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  login(login: LoginPayload): Promise<User> {
    const user = new User();
    user.wxOpenid = login.wxOpenid;
    user.name = login.name;
    user.avatarUrl = login.avatarUrl;
    return this.usersRepository.save(user);
  }
}
