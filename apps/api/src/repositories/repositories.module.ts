import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryController } from '~/repositories/controllers/repository.controller';
import { GithubRepository } from '~/repositories/entities/github-repository.entity';
import { RepositoryService } from '~/repositories/services/repository.service';

@Module({
    imports: [TypeOrmModule.forFeature([GithubRepository]), HttpModule],
    providers: [RepositoryService],
    controllers: [RepositoryController],
})
export class RepositoriesModule {}
