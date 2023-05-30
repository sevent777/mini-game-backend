import { Body, Controller, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { Access_Token_Key } from '../constant';
import { UserID } from '../core';
import { UserPayload } from './user.dto';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @Post('/login')
  async login(
    @Headers() headers: Record<string, string>,
    @Req() request: Request,
    @Body(new ValidationPipe())
    UserPayload: UserPayload,
    @Res() res: Response,
    @UserID() userId: number
  ) {
    console.log('userId :>> ', userId);

    const userPayload: UserPayload = {
      ...UserPayload,
      wxOpenid: headers['x-wx-openid'],
      id: userId,
    };
    const userInfo = await this.usersService.save(userPayload);
    const jwtStr = await this.jwtService.signAsync({
      id: userInfo.id,
    });
    res.cookie(Access_Token_Key, jwtStr);
    res.json({
      userInfo,
    });
  }
}
