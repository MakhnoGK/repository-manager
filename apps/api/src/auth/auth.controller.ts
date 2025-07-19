import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '~/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() data: { email: string; password: string }) {
        return await this.authService.register(data);
    }
}
