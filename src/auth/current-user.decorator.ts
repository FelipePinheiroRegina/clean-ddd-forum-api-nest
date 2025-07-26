import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserPayload } from './jwt.strategy'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
