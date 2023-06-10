import { Access_Token_Key } from '@app/constant';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { ExtendedRequest } from './context';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { cookies } = req;
    const accessToken = cookies[Access_Token_Key];
    if (!accessToken) {
      next();
    }
    if (accessToken) {
      this.jwtService
        .verifyAsync(accessToken)
        .then((decoded) => {
          req.userID = decoded?.id;
          next();
        })
        .catch(() => {
          next();
        });
    }
  }
}
