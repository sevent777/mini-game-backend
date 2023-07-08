import { JWT_SECRET, MAIN_DATABASE_NAME } from '@app/constant';
import { BaseTypeOrmModuleOptions, Configuration, ConfigurationType } from '@app/entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsModule } from './cms/cms.module';
import { GameModule } from './game/game.module';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...BaseTypeOrmModuleOptions,
      database: MAIN_DATABASE_NAME,
      entities: [ConfigurationType, Configuration],
    }),
    CmsModule,
    WebModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    GameModule,
  ],
})
export class AppModule {}
