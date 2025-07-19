import { useRegisterMutation } from '@/api/mutations/auth/useRegisterMutation';
import type { RegisterRequest } from '@/api/types/auth';
import RegisterForm from '@/components/forms/register-form';

export default function RegisterView() {
    const registerMutation = useRegisterMutation();

    const doRegister = async (data: RegisterRequest) => {
        await registerMutation.mutateAsync(data);
    };

    return <RegisterForm onSubmit={doRegister} />;
}
