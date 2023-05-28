import { Body, Controller, Headers, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { UserPayload } from './user.dto';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const userInfo = await this.usersService.create(userPayload);
    res.json({
      userInfo,
    });
  }
}
