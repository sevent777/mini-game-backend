import { ConfigPath, ConfigService } from '@app/config';
import { GameName } from '@app/constant';
import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { DetectiveService } from './detective.service';
import { DailyTestInfo, DetectiveTestList, SubmitAnswerInfo, TestType } from './dto';

@Controller(GameName.detective)
export class DetectiveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly detectiveService: DetectiveService
  ) {}

  @ApiResponse({
    type: DailyTestInfo,
  })
  @Get('/daily/info')
  async getDailyDetectiveInfo() {
    const configs = await this.configService.getConfigs(ConfigPath.dailyDetective, {
      take: 1,
    });
    const testList = await this.detectiveService.convertTestList(configs);
    const [testInfo] = testList;
    return {
      testInfo,
    };
  }

  @ApiResponse({
    type: DetectiveTestList,
  })
  @Get(`/${TestType.mini}/test-list`)
  async getMiniDetectiveTestList() {
    const configs = await this.configService.getConfigs(ConfigPath.miniDetective);
    const testList = await this.detectiveService.convertTestList(configs);
    return {
      list: testList,
    };
  }

  @Post('/submit-answer/:id')
  async submitAnswer(
    @Body(new ValidationPipe())
    info: SubmitAnswerInfo,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    return this.detectiveService.submitAnswer(id, info);
  }
}
