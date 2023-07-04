import { JWT_SECRET, MAIN_DATABASE_NAME } from '@app/constant';
import { Configuration, ConfigurationType, getTypeormRootModule, User } from '@app/entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {} from '@nestjs/typeorm';

import { CmsModule } from './cms/cms.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    getTypeormRootModule(MAIN_DATABASE_NAME, [User, ConfigurationType, Configuration]),
    CmsModule,
    WebModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    GameModule,
  ],
})
export class AppModule {}
