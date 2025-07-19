import { useLoginMutation } from '@/api/mutations/auth/useLoginMutation';
import type { LoginRequest } from '@/api/types/auth';
import LoginForm from '@/components/forms/login-form';

export default function LoginView() {
    const loginMutation = useLoginMutation();

    const doLogin = async ({ email, password }: LoginRequest) => {
        const result = await loginMutation.mutateAsync({ email, password });

        if (result.success) console.log('success');
    };

    return <LoginForm onSubmit={doLogin} />;
}
