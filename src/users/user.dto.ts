import { IsString } from 'class-validator';

export class LoginPayload {
  @IsString()
  name: string;

  @IsString()
  wxOpenid: string;

  @IsString()
  avatarUrl: string;
}
