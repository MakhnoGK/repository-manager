import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { GithubRepository } from '~/repositories/entities/github-repository.entity';
import { GithubRepositoryMapper } from '~/repositories/mappers/github-repository.mapper';
import { GithubRepositoryApiResponse } from '~/repositories/types';

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
        private readonly httpService: HttpService,
        @Inject(REQUEST)
        private readonly request: RequestWithUser,
    ) {}

    async createOne(path: string) {
        const repositoryInfo = await this.getRepositoryInfo(path);
        const createRepositoryDto = GithubRepositoryMapper.toDtoFromApiResponse(repositoryInfo);
        const repository = this.repositoriesRepository.create({
            ...createRepositoryDto,
            createdBy: this.request.user.id,
        });

        return await this.repositoriesRepository.save(repository);
    }

    async updateOne(fullName: string) {
        const githubRepositoryInfo = await this.getRepositoryInfo(fullName);
        const githubUpdateRepositoryDto = GithubRepositoryMapper.toDtoFromApiResponse(githubRepositoryInfo);

        return await this.repositoriesRepository.update({ fullName }, githubUpdateRepositoryDto);
    }

    async getList() {
        return await this.repositoriesRepository.find({ where: { createdBy: this.request.user.id } });
    }

    async getOne(id: number) {
        return await this.repositoriesRepository.findOne({ where: { id } });
    }

    private async getRepositoryInfo(path: string) {
        const url = `${RepositoryService.GITHUB_API_URL}${path}`;
        const { data } = await firstValueFrom(this.httpService.get<GithubRepositoryApiResponse>(url));

        return data;
    }
}
