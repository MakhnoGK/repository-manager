import { apiClient } from '@/api/apiClient';
import type { LoginRequest, LoginResponse } from '@/api/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () =>
    useMutation({
        mutationFn: async (data: LoginRequest) =>
            apiClient.post<LoginResponse>('/auth/login', data).then((response) => response.data),
    });
