import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '~/auth/entities/account.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'repository-manager',
            username: 'root',
            password: 'root',
            entities: [Account],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
