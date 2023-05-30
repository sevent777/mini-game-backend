import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserPayload {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  wxOpenid: string;

  @IsString()
  avatarUrl: string;
}
