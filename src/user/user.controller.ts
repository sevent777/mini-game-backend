import { Body, Controller, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Access_Token_Key } from 'constant';
import { genRspJson, UserID } from 'core';
import { LoginPayload, LoginResponse } from 'dto';
import { Request, Response } from 'express';

import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @Post('/login')
  async login(
    @Headers() headers: Record<string, string>,
    @Req() request: Request,
    @Body(new ValidationPipe())
    LoginPayload: LoginPayload,
    @Res() res: Response,
    @UserID() userId: number
  ) {
    const loginPayload: LoginPayload = {
      ...LoginPayload,
      wxOpenid: headers['x-wx-openid'],
      id: userId,
    };
    const userInfo = await this.userService.login(loginPayload);
    const jwtStr = await this.jwtService.signAsync({
      id: userInfo.id,
    });
    res.cookie(Access_Token_Key, jwtStr);
    res
      .json(
        genRspJson({
          userInfo,
        })
      )
      .send();
  }
}
