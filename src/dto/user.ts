import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'entity';
export class LoginPayload {
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  wxOpenid: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl: string;
}

export class LoginResponse {
  @ApiProperty()
  userInfo: User;
}
