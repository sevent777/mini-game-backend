import { ACCESS_TOKEN_KEY } from '@app/constant';
import { genRspJson } from '@app/core';
import { Body, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { LoginPayload, LoginResponse } from './user.dto';
import { UserService } from './user.service';

export abstract class UserController {
  constructor(
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService
  ) {}

  @ApiResponse({
    type: LoginResponse,
  })
  @Post('/login')
  async login(
    @Headers() headers: Record<string, string>,
    @Req() request: Request,
    @Body(new ValidationPipe())
    loginPayload: LoginPayload,
    @Res() res: Response
  ) {
    const finalLoginPayload: LoginPayload = {
      ...loginPayload,
      wxOpenid: headers['x-wx-openid'],
    };
    const userInfo = await this.userService.login(finalLoginPayload);
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
