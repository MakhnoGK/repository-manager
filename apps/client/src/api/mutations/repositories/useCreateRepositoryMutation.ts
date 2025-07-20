import { apiClient } from '@/api/apiClient.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateRepositoryRequest = {
    fullName: string;
};

export type Repository = {
    id: number;
    fullName: string;
    url: string;
    stars: number;
    forks: number;
    issues: number;
    createdAt: string;
    updatedAt: string;
};

type CreateRepositoryResponse = Repository;

export const useCreateRepositoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (repository: CreateRepositoryRequest) =>
            await apiClient.post<CreateRepositoryResponse>('/repositories', repository).then(({ data }) => data),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['repositories-list'] }),
    });
};
