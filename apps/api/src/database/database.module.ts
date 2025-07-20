import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'repository-manager',
            username: 'root',
            password: 'root',
            entities: [User],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
