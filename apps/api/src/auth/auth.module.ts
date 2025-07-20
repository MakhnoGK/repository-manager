import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '~/auth/strategy/jwt.strategy';
import { LocalStrategy } from '~/auth/strategy/local.strategy';
import { UsersModule } from '~/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ session: false }),
        JwtModule.register({
            secret: 'changeme',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
