import { apiClient } from '@/api/apiClient';
import type { RegisterResponse } from '@/api/types/auth.ts';
import { useMutation } from '@tanstack/react-query';

export const useRegisterMutation = () =>
    useMutation({
        mutationFn: async (data: RegisterRequest) =>
            apiClient.post<RegisterResponse>('/auth/register', data).then((response) => response.data),
    });
