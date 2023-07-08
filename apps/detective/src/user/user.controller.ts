import { GameName } from '@app/constant';
import { UserController } from '@app/user';
import { Controller } from '@nestjs/common';

@Controller(`${GameName.detective}/user`)
export class DetectiveUserController extends UserController {}
