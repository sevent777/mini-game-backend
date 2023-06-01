import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'dto';
import { User } from 'entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async save(payload: UserPayload): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        {
          id: payload.id,
        },
        {
          wxOpenid: payload.wxOpenid,
        },
      ],
    });
    const user = existingUser ?? new User();

    user.name = payload.name;
    user.avatarUrl = payload.avatarUrl;
    user.wxOpenid = payload.wxOpenid;

    return this.userRepository.save(user);
  }
}
