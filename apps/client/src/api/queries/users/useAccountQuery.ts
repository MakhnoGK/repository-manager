import { apiClient } from '@/api/apiClient.ts';
import { useQuery } from '@tanstack/react-query';

export const useAccountQuery = () =>
    useQuery({
        queryKey: ['account'],
        retry: false,
        queryFn: async () =>
            await apiClient
                .get<{
                    email: string;
                }>('/users/me', { withCredentials: true })
                .then(({ data }) => data),
    });
