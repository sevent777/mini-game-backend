import { Injectable } from '@nestjs/common';

@Injectable()
export class CmsService {
  createConfig() {
    return 'Hello World!';
  }
}
