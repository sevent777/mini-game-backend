import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const res = Number(request.userID);
  if (!Number.isNaN) {
    return res;
  }
});
