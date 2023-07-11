import { DetectiveUser } from '@app/entity';
import { LoginResponse } from '@app/user';
import { ApiProperty } from '@nestjs/swagger';

export class DetectiveLoginResponse extends LoginResponse {
  @ApiProperty({
    type: DetectiveUser,
  })
  userInfo: DetectiveUser;
}
