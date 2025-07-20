import { apiClient } from '@/api/apiClient.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () =>
            await apiClient
                .post<{
                    success: boolean;
                }>('/auth/logout', {}, { withCredentials: true })
                .then(({ data }) => data),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['account'] }),
    });
};
