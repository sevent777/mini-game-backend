import { GameName } from '@app/constant';
import { ConfigPath, ConfigService } from '@app/service';
import { Controller, Get } from '@nestjs/common';

import { DetectiveService } from './detective.service';

@Controller(GameName.detective)
export class DetectiveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly detectiveService: DetectiveService
  ) {}

  @Get('/daily/info')
  async getDailyDetectiveInfo() {
    const configs = await this.configService.getConfigs(ConfigPath.dailyDetective);
    const [testInfo] = configs;
    return {
      testInfo,
    };
  }
}
