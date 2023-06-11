import { TimestampToDatePipe } from '@app/core';
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
import { ConfigListRsp, ConfigOperationPayload } from './dto/config';

@Controller('cms/config')
@UseGuards(new AuthGuard())
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @ApiResponse({
    status: 200,
    type: ConfigListRsp,
  })
  @Get('list')
  async getList(): Promise<ConfigListRsp> {
    const list = await this.cmsService.getList();
    return {
      list,
    };
  }

  @Post('create')
  create(
    @Body(new ValidationPipe())
    createConfigPayload: ConfigOperationPayload,
    @Body('effectiveTime', TimestampToDatePipe) effectiveTime: Date
  ) {
    const config = {
      ...createConfigPayload,
      effectiveTime,
    };
    return this.cmsService.createConfig(config);
  }

  @Post('update/:id')
  update(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    updateOperation: ConfigOperationPayload,
    @Body('effectiveTime', TimestampToDatePipe) effectiveTime: Date,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    const config = {
      id,
      ...updateOperation,
      effectiveTime,
    };
    return this.cmsService.updateConfig(config);
  }
}
