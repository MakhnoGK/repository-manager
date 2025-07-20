import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { AuthService } from '~/auth/auth.service';
import { RegisterRequestDto } from '~/auth/dto/register-request.dto';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from '~/auth/guard/local-auth.guard';
import { TokenType } from '~/auth/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() data: RegisterRequestDto) {
        return await this.authService.register(data);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @Request()
        request: Request & {
            user: { id: number; email: string };
        },
        @Res({ passthrough: true }) response: ResponseType,
    ) {
        const { access_token } = this.authService.login(request.user);

        response.cookie(TokenType.ACCESS, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return { success: true };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Res({ passthrough: true }) response: ResponseType) {
        response.cookie(TokenType.ACCESS, '');
        return { success: true };
    }
}
