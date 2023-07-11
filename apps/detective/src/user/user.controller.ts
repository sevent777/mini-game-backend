import { GameName } from '@app/constant';
import { LoginPayload, UserService } from '@app/user';
import { Body, Controller, Inject, Post, Res, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { DetectiveLoginResponse } from './user.dto';
import { DetectiveUserService } from './user.service';

@Controller(`${GameName.detective}/user`)
export class DetectiveUserController {
  constructor(@Inject(UserService) protected readonly userService: DetectiveUserService) {}

  @ApiResponse({
    type: DetectiveLoginResponse,
  })
  @Post('/login')
  async login(
    @Body(new ValidationPipe())
    loginPayload: LoginPayload,
    @Res() res: Response
  ) {
    return this.userService.login(loginPayload, res);
  }
}
