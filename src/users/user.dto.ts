import { IsOptional, IsString } from 'class-validator';

export class LoginPayload {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  wxOpenid: string;

  @IsString()
  avatarUrl: string;
}
