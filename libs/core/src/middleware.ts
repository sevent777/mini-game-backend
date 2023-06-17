import { ACCESS_TOKEN_KEY } from '@app/constant';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { ExtendedRequest } from './context';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { cookies } = req;
    try {
      const accessToken = cookies[ACCESS_TOKEN_KEY];
      if (accessToken) {
        const decoded = await this.jwtService.verifyAsync(accessToken);
        req.userID = decoded?.id;
        next();
        return;
      }
    } catch (e) {
      console.error(e);
    }
    next();
  }
}
