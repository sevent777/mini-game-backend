import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { LoginPayload } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) loginPayload: LoginPayload,
    @Response() rsp: ExpressResponse
  ): Promise<User> {
    const userInfo = await this.usersService.login(loginPayload);
    console.log('rsp :>> ', rsp);
    // rsp.cookie =
    return userInfo;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }
}
