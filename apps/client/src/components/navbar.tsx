import { useAccountQuery } from '@/api/queries/auth/useAccountQuery.ts';
import LogoutButton from '@/components/logout-button.tsx';
import { useNavigate } from '@tanstack/react-router';

export default function Navbar() {
    const accountQuery = useAccountQuery();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await navigate({ to: '/' });
    };

    return (
        <nav className="flex items-center justify-between py-4 px-4 mb-8 shadow-lg">
            <h1 className="font-bold">Repository manager</h1>
            <div className="flex items-center gap-2">
                <div>{accountQuery.data?.email}</div>
                <LogoutButton onLogout={handleLogout} />
            </div>
        </nav>
    );
}
