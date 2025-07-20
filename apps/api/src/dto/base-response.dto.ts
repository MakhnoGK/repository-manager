import { Expose, plainToInstance } from 'class-transformer';

export class BaseResponseDto {
    @Expose()
    success: boolean;

    static createFromPlain(plain: unknown) {
        return plainToInstance(BaseResponseDto, plain);
    }
}
