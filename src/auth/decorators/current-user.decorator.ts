import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): Admin => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
