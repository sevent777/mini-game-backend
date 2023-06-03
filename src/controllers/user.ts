import { Body, Controller, Get, Headers, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Access_Token_Key } from 'constant';
import { genRspJson, UserID } from 'core';
import { LoginResponse, UserPayload } from 'dto';
import { Request, Response } from 'express';
import { UsersService } from 'services/user';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: LoginResponse,
  })
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
    res.json(
      genRspJson({
        userInfo,
      })
    );
  }

  @Get('/test')
  test() {
    return {
      test: '33',
    };
  }
}
