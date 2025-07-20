import { Expose, plainToInstance } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsStrongPassword()
    password: string;

    static createFromPlain(email: string, password: string): RegisterRequestDto {
        return plainToInstance(RegisterRequestDto, { email, password });
    }
}
