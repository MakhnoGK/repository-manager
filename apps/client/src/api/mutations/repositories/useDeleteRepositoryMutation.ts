import { apiClient } from '@/api/apiClient.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRepositoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => await apiClient.delete(`/repositories/${id}`).then(({ data }) => data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['repositories-list'] });
        },
    });
};
