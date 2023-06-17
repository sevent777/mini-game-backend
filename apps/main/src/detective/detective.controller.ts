import { GameName } from '@app/constant';
import { ConfigPath, ConfigService } from '@app/service';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { DetectiveService } from './detective.service';
import { DailyTestInfo } from './dto/daily';

@Controller(GameName.detective)
export class DetectiveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly detectiveService: DetectiveService
  ) {}

  @ApiResponse({
    status: 200,
    type: DailyTestInfo,
  })
  @Get('/daily/info')
  async getDailyDetectiveInfo() {
    const configs = await this.configService.getConfigs(ConfigPath.dailyDetective, {
      take: 1,
    });
    const [testInfo] = configs;
    return {
      testInfo,
    };
  }
}
