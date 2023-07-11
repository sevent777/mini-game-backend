import { ACCESS_TOKEN_KEY } from '@app/constant';
import { UserService } from '@app/user';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { ExtendedRequest } from './context';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { cookies } = req;
    try {
      const accessToken = cookies[ACCESS_TOKEN_KEY];
      if (accessToken) {
        const decoded = await this.jwtService.verifyAsync(accessToken);
        req.userID = Number(decoded?.id);
        next();
        return;
      }
    } catch (e) {
      console.error(e);
    }

    const wxUser = await this.userService.searchExistingUsers();

    if (wxUser) {
      req.userID = wxUser.id;
      next();
      return;
    }
    throw new UnauthorizedException('Not logged in');
  }
}
