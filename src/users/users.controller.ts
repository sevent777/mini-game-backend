import { Body, Controller, Headers, Post, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { Access_Token_Key } from '../constant';
import { UserPayload } from './user.dto';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  @Post('/login')
  async login(
    @Headers() headers: Record<string, string>,
    @Body(new ValidationPipe()) UserPayload: UserPayload,
    @Res() res: Response
  ) {
    const userPayload: UserPayload = {
      ...UserPayload,
      wxOpenid: headers['x-wx-openid'],
    };
    const userInfo = await this.usersService.save(userPayload);
    res.cookie(
      Access_Token_Key,
      await this.jwtService.signAsync({
        id: userInfo.id,
      })
    );
    res.json({
      userInfo,
    });
  }
}
