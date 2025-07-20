import { hash } from 'node:crypto';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from '~/auth/dto/register-request.dto';
import { UsersService } from '~/users/users.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        const hashedPassword = hash('md5', password);

        if (user && user.password === hashedPassword) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _password, ...result } = user;
            return result;
        }

        return null;
    }

    login(user: { email: string; id: number }) {
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        return { access_token };
    }

    async register(userDto: RegisterRequestDto) {
        const accountWithHashedPassword = this.hashPassword(userDto);

        try {
            const insertResult = await this.usersService.createOne(accountWithHashedPassword);

            return { success: !!insertResult };
        } catch (error) {
            if (error instanceof QueryFailedError && 'code' in error) {
                if (error.code === '23505') {
                    throw new ConflictException('Email already exists');
                }
            }

            throw error;
        }
    }

    private hashPassword(userDto: RegisterRequestDto) {
        return RegisterRequestDto.createFromPlain({
            email: userDto.email,
            password: hash('md5', userDto.password),
        });
    }
}
