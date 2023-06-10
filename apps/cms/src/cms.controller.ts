import { Controller, Post } from '@nestjs/common';

import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('config/create')
  create() {
    return this.cmsService.createConfig();
  }
}
