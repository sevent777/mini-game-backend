import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class ConfigTypeOperationPayload {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  path: string;
}

export class ConfigOperationPayload {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  configTypeId: number;

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
  @ApiProperty({
    type: [ConfigurationType],
  })
  list: ConfigurationType[];
}
