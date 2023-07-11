import { ExtendedRequest } from '@app/core';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UserInfoProvider {
  constructor(@Inject(REQUEST) private request: ExtendedRequest) {}

  get userID() {
    return this.request.userID;
  }

  get wxOpenid() {
    return this.request.headers['x-wx-openid'] as string;
  }
}
