import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenType } from '~/auth/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: 'changeme',
        });
    }

    validate(payload: { sub: number; email: string }) {
        return { id: payload.sub, email: payload.email };
    }

    private static extractJWT(this: void, req: RequestType) {
        if (req.cookies && req.cookies.access_token && (req.cookies[TokenType.ACCESS] as string).length > 0) {
            return req.cookies[TokenType.ACCESS] as string;
        }

        return null;
    }
}
