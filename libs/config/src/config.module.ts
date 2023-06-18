import { Configuration, ConfigurationType } from '@app/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from './config.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationType, Configuration])],
  providers: [ConfigService],
  exports: [TypeOrmModule],
})
export class ConfigModule {}
