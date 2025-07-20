import { useRegisterMutation } from '@/api/mutations/auth/useRegisterMutation';
import type { RegisterRequest } from '@/api/types/auth';
import RegisterForm from '@/components/forms/register-form';
import { useNavigate } from '@tanstack/react-router';

export default function RegisterView() {
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();

    const doRegister = async (data: RegisterRequest) => {
        const { success } = await registerMutation.mutateAsync(data);
        if (success) await navigate({ to: '/login' });
    };

    return <RegisterForm onSubmit={doRegister} />;
}
