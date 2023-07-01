import {
  DATABASE_NAME,
  JWT_SECRET,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USERNAME,
} from '@app/constant';
import { Configuration, ConfigurationType, User } from '@app/entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CmsModule } from './cms/cms.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT),
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: DATABASE_NAME,
      autoLoadEntities: true,
      logging: true,
      synchronize: false,
      entities: [User, ConfigurationType, Configuration],
    }),
    TypeOrmModule.forFeature([User, ConfigurationType, Configuration]),
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
