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
import { CmsService } from './cms.service';
import { ConfigListRsp, ConfigOperationPayload, ConfigTypeOperationPayload } from './dto/config';

@Controller('cms/config')
@UseGuards(new AuthGuard())
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('type/create')
  createType(
    @Body(new ValidationPipe())
    createConfigTypePayload: ConfigTypeOperationPayload
  ) {
    return this.cmsService.createOrUpdateConfigType(createConfigTypePayload);
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
    return this.cmsService.createOrUpdateConfigType(config);
  }

  @ApiResponse({
    status: 200,
    type: ConfigListRsp,
  })
  @Get('list')
  async getList(): Promise<ConfigListRsp> {
    const list = await this.cmsService.getTypeList();
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
    const configType = await this.cmsService.findConfigType(createConfigPayload.configTypeId);
    const config: Partial<Configuration> = {
      ...createConfigPayload,
      effectiveTime,
      configType,
    };
    return this.cmsService.createOrUpdateConfig(config);
  }

  @Post('update/:id')
  async update(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateOperation: ConfigOperationPayload,
    @Body('effectiveTime', TimestampToDatePipe) effectiveTime: Date,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const configType = await this.cmsService.findConfigType(updateOperation.configTypeId);
    const config = {
      id,
      ...updateOperation,
      effectiveTime,
      configType,
    };
    return this.cmsService.createOrUpdateConfig(config);
  }

  @Post('delete/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.cmsService.deleteConfig(id);
  }
}
