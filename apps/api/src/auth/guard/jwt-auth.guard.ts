import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: unknown, user: any) {
        if (err || !user) {
            throw new UnauthorizedException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return user;
    }
}
