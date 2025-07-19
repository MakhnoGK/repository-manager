import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '~/auth/entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
