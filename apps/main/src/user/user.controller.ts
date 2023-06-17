import { ACCESS_TOKEN_KEY } from '@app/constant';
import { genRspJson, UserID } from '@app/core';
import { UserService } from '@app/service/user.service';
import { Body, Controller, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { LoginPayload, LoginResponse } from './user.dto';

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
    loginPayload: LoginPayload,
    @Res() res: Response,
    @UserID() userId: number
  ) {
    const finalLoginPayload: LoginPayload = {
      ...loginPayload,
      wxOpenid: headers['x-wx-openid'],
      id: userId,
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
