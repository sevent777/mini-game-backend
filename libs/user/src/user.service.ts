import { ACCESS_TOKEN_KEY } from '@app/constant';
import { ExtendedRequest, genRspJson } from '@app/core';
import { User } from '@app/entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { pick } from 'lodash';
import { FindOptionsWhere, Repository } from 'typeorm';

import { LoginPayload } from './user.dto';

export abstract class UserService {
  constructor(
    protected readonly request: ExtendedRequest,
    protected readonly userRepository: Repository<User>,
    protected readonly jwtService: JwtService
  ) {
    console.log('init UserServic1 :>> ');
  }

  get userID() {
    return this.request.userID;
  }

  get wxOpenid() {
    return this.request.headers['x-wx-openid'] as string;
  }

  abstract getCurrentUser(): Promise<User>;

  async searchExistingUsers(payload: LoginPayload) {
    const { userID = this.userID, wxOpenid = this.wxOpenid } = payload;
    const conditions: FindOptionsWhere<User>[] = [];
    if (userID) {
      conditions.push({
        id: userID,
      });
    }
    if (wxOpenid) {
      conditions.push({
        wxOpenid,
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

  async login(payload: LoginPayload, res: Response): Promise<void> {
    const existingUser = await this.searchExistingUsers(payload);
    const user = existingUser || this.userRepository.create();

    Object.assign(user, pick(payload, ['name', 'avatarUrl', 'wxOpenid']));

    const userInfo = await this.userRepository.save(user);
    const jwtStr = await this.jwtService.signAsync({
      id: userInfo.id,
    });
    res.cookie(ACCESS_TOKEN_KEY, jwtStr);
    res
      .json(
        genRspJson({
          userInfo,
        })
      )
      .send();
  }
}
