import { apiClient } from '@/api/apiClient.ts';
import { useMutation } from '@tanstack/react-query';

export const useLogoutMutation = () =>
    useMutation({
        mutationFn: async () =>
            await apiClient
                .post<{
                    success: boolean;
                }>('/auth/logout', {}, { withCredentials: true })
                .then(({ data }) => data),
    });
