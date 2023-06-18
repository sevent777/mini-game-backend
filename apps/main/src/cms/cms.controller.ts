import { ConfigService } from '@app/config';
import { TimestampToDatePipe } from '@app/core';
import { Configuration } from '@app/entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from './cms.guard';
import { ConfigListRsp, ConfigOperationPayload, ConfigTypeOperationPayload } from './dto/config';

@Controller('cms/config')
@UseGuards(new AuthGuard())
export class CmsController {
  constructor(private readonly configService: ConfigService) {}

  @Post('type/create')
  createType(
    @Body(new ValidationPipe())
    createConfigTypePayload: ConfigTypeOperationPayload
  ) {
    return this.configService.createOrUpdateConfigType(createConfigTypePayload);
  }

  @Post('type/update/:id')
  updateType(
    @Body(new ValidationPipe())
    updateconfigTypePayload: ConfigTypeOperationPayload,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const config = {
      id,
      ...updateconfigTypePayload,
    };
    return this.configService.createOrUpdateConfigType(config);
  }

  @ApiResponse({
    status: 200,
    type: ConfigListRsp,
  })
  @Get('list')
  async getList(): Promise<ConfigListRsp> {
    const list = await this.configService.getTypeList();
    return {
      list,
    };
  }

  @Post('create')
  async create(
    @Body(new ValidationPipe())
    createConfigPayload: ConfigOperationPayload,
    @Body('effectiveTime', TimestampToDatePipe) effectiveTime: Date
  ) {
    const configType = await this.configService.findConfigType(createConfigPayload.configTypeId);
    const config: Partial<Configuration> = {
      ...createConfigPayload,
      effectiveTime,
      configType,
    };
    return this.configService.createOrUpdateConfig(config);
  }

  @Post('update/:id')
  async update(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateOperation: ConfigOperationPayload,
    @Body('effectiveTime', TimestampToDatePipe) effectiveTime: Date,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const configType = await this.configService.findConfigType(updateOperation.configTypeId);
    const config = {
      id,
      ...updateOperation,
      effectiveTime,
      configType,
    };
    return this.configService.createOrUpdateConfig(config);
  }

  @Post('delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.configService.deleteConfig(id);
  }
}
