import { IsOptional, IsString } from 'class-validator';

export class UserPayload {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  wxOpenid: string;

  @IsString()
  avatarUrl: string;
}
