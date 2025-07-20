import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '~/auth/dto/register-request.dto';
import { User } from '~/users/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createOne(userDto: RegisterRequestDto) {
        const user = this.userRepository.create(userDto);
        return await this.userRepository.save(user);
    }

    async findOne(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }
}
