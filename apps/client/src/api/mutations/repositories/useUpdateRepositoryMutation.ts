import { apiClient } from '@/api/apiClient.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateRepositoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (fullName: string) =>
            await apiClient.put(`/repositories`, { fullName }).then(({ data }) => data),
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['repositories-list'] }),
    });
};
