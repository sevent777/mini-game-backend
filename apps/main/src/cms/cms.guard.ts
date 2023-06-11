import { ADMIN_TOKEN, JAX_ADMIN_TOKEN_KEY } from '@app/constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { cookies } = request;
    const accessToken = cookies[JAX_ADMIN_TOKEN_KEY];
    return accessToken === ADMIN_TOKEN;
  }
}
