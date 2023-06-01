import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'modules/user';

import {
  DATABASE_NAME,
  JWT_SECRET,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USERNAME,
} from './constant';
import { LoginMiddleware } from './core';

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
      synchronize: true,
      logging: true,
    }),
    UsersModule,

    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('*');
  }
}
