import { Configuration } from '@app/entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class ConfigOperationPayload {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsObject()
  content: object;

  @ApiProperty()
  @IsNumber()
  effectiveTime: number;
}

export class ConfigOperationRsp {
  config: Configuration;
}

export class ConfigListRsp {
  list: Configuration[];
}
