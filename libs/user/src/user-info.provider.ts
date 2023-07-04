import { ExtendedRequest } from '@app/core';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UserInfoProvider {
  constructor(@Inject(REQUEST) private request: ExtendedRequest) {}

  get userID() {
    return this.request.userID;
  }
}
