import { plainToInstance } from 'class-transformer';
import { CreateGithubRepositoryDto } from '~/repositories/dto/create-github-repository.dto';
import { GithubRepositoryApiResponse } from '~/repositories/types';

export class GithubRepositoryMapper {
    static toDtoFromApiResponse(response: GithubRepositoryApiResponse) {
        return plainToInstance(CreateGithubRepositoryDto, {
            fullName: response.full_name,
            url: response.html_url,
            stars: response.stargazers_count,
            forks: response.forks_count,
            issues: response.open_issues_count,
            createdAt: new Date(response.created_at),
        } satisfies CreateGithubRepositoryDto);
    }
}
