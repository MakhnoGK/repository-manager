import { useEffect } from 'react';
import { useAccountQuery } from '@/api/queries/users/useAccountQuery';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
    component: RouteComponent,
});

function RouteComponent() {
    const account = useAccountQuery();
    const navigate = useNavigate();

    console.log(account);

    useEffect(() => {
        if (!account.isPending && account.data) void navigate({ to: '/' });
    }, [account.isPending, account.data]);

    if (account.isPending || (account.isFetched && account.data)) return null;

    return (
        <div className="h-screen flex items-center justify-center">
            <Outlet />
        </div>
    );
}
