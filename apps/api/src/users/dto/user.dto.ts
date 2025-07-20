import { Exclude, Expose, plainToInstance } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    static createFromPlain(plain: unknown) {
        return plainToInstance(UserDto, plain);
    }
}
