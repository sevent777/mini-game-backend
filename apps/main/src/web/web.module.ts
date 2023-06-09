import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

import { WebController } from './web.controller';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../../web/build'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [WebController],
})
export class WebModule {}
