import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { UserDto } from '~/users/dto/user.dto';
import { UsersService } from '~/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() request: Request) {
        const requestUser = request.user as { email: string };
        const user = await this.usersService.findOne(requestUser.email);

        return UserDto.createFromPlain(user);
    }
}
