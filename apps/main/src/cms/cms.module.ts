import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationType, Configuration])],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
