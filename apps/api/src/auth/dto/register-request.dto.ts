import { Expose, plainToInstance } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class RegisterRequestDto {
    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    password: string;

    static createFromPlain(plain: object): RegisterRequestDto {
        return plainToInstance(RegisterRequestDto, plain);
    }
}
