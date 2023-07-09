import { GameName } from '@app/constant';
import { UserController } from '@app/user';
import { Controller } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DetectiveUserService } from './user.service';

@Controller(`${GameName.detective}/user`)
export class DetectiveUserController extends UserController {
  constructor(
    protected readonly userService: DetectiveUserService,
    protected readonly jwtService: JwtService
  ) {
    super(userService, jwtService);
  }
}
