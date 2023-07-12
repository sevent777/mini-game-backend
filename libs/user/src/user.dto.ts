import { User } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoginPayload {
  userID?: number;
  wxOpenid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class LoginResponse {
  @ApiProperty()
  userInfo: User;
}
