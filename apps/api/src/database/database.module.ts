import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubRepository } from '~/repositories/entities/github-repository.entity';
import { User } from '~/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
            port: 5432,
            database: 'repository-manager',
            username: 'root',
            password: 'root',
            entities: [User, GithubRepository],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
