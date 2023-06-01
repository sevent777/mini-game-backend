import { Body, Controller, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Access_Token_Key } from 'constant';
import { UserID } from 'core';
import { UserPayload } from 'dto';
import { Request, Response } from 'express';
import { UsersService } from 'services/user';

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
