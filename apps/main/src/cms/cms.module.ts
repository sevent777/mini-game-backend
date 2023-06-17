import { Configuration } from '@app/entity';
import { ConfigurationType } from '@app/entity/configuration-type';
import { ConfigService } from '@app/service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsController } from './cms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationType, Configuration])],
  controllers: [CmsController],
  providers: [ConfigService],
})
export class CmsModule {}
