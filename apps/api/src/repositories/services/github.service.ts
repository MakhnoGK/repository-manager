import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { GithubRepositoryMapper } from '~/repositories/mappers/github-repository.mapper';
import { GithubRepositoryApiResponse } from '~/repositories/types';

@Injectable()
export class GithubService {
    private static GITHUB_API_URL = 'https://api.github.com/repos/';

    constructor(private readonly httpService: HttpService) {}

    async getRepositoryInfo(path: string) {
        const url = `${GithubService.GITHUB_API_URL}${path}`;
        try {
            const { data } = await firstValueFrom(this.httpService.get<GithubRepositoryApiResponse>(url));
            return GithubRepositoryMapper.toDtoFromApiResponse(data);
        } catch (error) {
            const axiosError = error as AxiosError;

            if (axiosError.status === 404) {
                throw new NotFoundException(`Repository not found: ${path}`);
            }

            throw new Error(`Failed to fetch repository info from GitHub.`);
        }
    }
}
