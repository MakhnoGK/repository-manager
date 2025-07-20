import { useLogoutMutation } from '@/api/mutations/auth/useLogoutMutation.ts';
import { Button } from '@/components/ui/button.tsx';

type LogoutButtonProps = {
    onLogout?: () => void;
};

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
    const logoutMutation = useLogoutMutation();

    const doLogout = async () => {
        const response = await logoutMutation.mutateAsync();
        if (response.success) onLogout?.();
    };

    return (
        <Button type="button" onClick={doLogout}>
            Logout
        </Button>
    );
}
