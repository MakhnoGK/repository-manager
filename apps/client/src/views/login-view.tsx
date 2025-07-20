import { useLoginMutation } from '@/api/mutations/auth/useLoginMutation';
import type { LoginRequest } from '@/api/types/auth';
import LoginForm from '@/components/forms/login-form';
import { useNavigate } from '@tanstack/react-router';

export default function LoginView() {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const doLogin = async ({ email, password }: LoginRequest) => {
        const result = await loginMutation.mutateAsync({ email, password });

        if (result.success) await navigate({ to: '/', replace: true });
    };

    return <LoginForm onSubmit={doLogin} />;
}
