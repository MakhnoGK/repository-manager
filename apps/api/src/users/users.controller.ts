import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { UsersService } from '~/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() request: Request) {
        const user = request.user as { email: string };
        return this.usersService.findOne(user.email);
    }
}
