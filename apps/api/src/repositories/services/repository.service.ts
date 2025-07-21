import { ConflictException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { GithubRepository } from '~/repositories/entities/github-repository.entity';
import { GithubService } from '~/repositories/services/github.service';

type RequestWithUser = {
    user: {
        id: number;
    };
};

@Injectable({ scope: Scope.REQUEST })
export class RepositoryService {
    private static GITHUB_API_URL = 'https://api.github.com/repos/';

    constructor(
        @InjectRepository(GithubRepository) private readonly repositoriesRepository: Repository<GithubRepository>,
        @Inject(REQUEST)
        private readonly request: RequestWithUser,
        private readonly githubService: GithubService,
    ) {}

    async createOne(path: string) {
        const createRepositoryDto = await this.githubService.getRepositoryInfo(path);

        try {
            const repository = this.repositoriesRepository.create({
                ...createRepositoryDto,
                createdBy: this.request.user.id,
            });

            return await this.repositoriesRepository.save(repository);
        } catch (error) {
            if (error instanceof QueryFailedError && 'code' in error) {
                if (error.code === '23505') {
                    throw new ConflictException('Repository already exists.');
                }
            }

            throw error;
        }
    }

    async updateOne(fullName: string) {
        const githubUpdateRepositoryDto = await this.githubService.getRepositoryInfo(fullName);

        return await this.repositoriesRepository.update({ fullName }, githubUpdateRepositoryDto);
    }

    async getAll() {
        return await this.repositoriesRepository.find({ where: { createdBy: this.request.user.id } });
    }

    async deleteOne(id: number) {
        return await this.repositoriesRepository.delete(id);
    }
}
