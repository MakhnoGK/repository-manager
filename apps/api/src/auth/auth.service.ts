import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'crypto';
import { Repository } from 'typeorm';
import { Account } from '~/auth/entities/account.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

    async login() {}

    async register(data: { email: string; password: string }) {
        const accountWithHashedPassword = this.transformUserPassword(data);
        const insertResult = await this.accountRepository.insert(accountWithHashedPassword);

        return { success: insertResult.identifiers.length > 0 };
    }

    private transformUserPassword(accountRequest: { email: string; password: string }) {
        return { ...accountRequest, password: hash('md5', accountRequest.password) };
    }
}
