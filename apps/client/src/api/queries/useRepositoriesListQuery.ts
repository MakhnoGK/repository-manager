import { apiClient } from '@/api/apiClient.ts';
import type { Repository } from '@/api/mutations/repositories/useCreateRepositoryMutation.ts';
import { useQuery } from '@tanstack/react-query';

export const useRepositoriesListQuery = () =>
    useQuery({
        queryKey: ['repositories-list'],
        queryFn: async () =>
            await apiClient.get<Repository[]>('/repositories', { withCredentials: true }).then(({ data }) => data),
    });
