import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'entity';
export class UserPayload {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wxOpenid: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;
}

export class LoginResponse {
  @ApiProperty()
  userInfo: User;
}
