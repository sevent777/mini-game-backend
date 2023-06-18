import { ConfigModule, ConfigService } from '@app/config';
import { Module } from '@nestjs/common';

import { CmsController } from './cms.controller';

@Module({
  imports: [ConfigModule],
  controllers: [CmsController],
  providers: [ConfigService],
})
export class CmsModule {}
