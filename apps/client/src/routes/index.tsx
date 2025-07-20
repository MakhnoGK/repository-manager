import { useEffect, useState } from 'react';
import { apiClient } from '@/api/apiClient.ts';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    const [user, setUser] = useState<unknown>(null);

    const doLogout = async () => {
        await apiClient.post('/auth/logout', {}, { withCredentials: true });
    };

    useEffect(() => {
        apiClient
            .get<{
                user: unknown;
            }>('/users/me', { withCredentials: true })
            .then((response) => setUser(response.data));
    }, []);

    return (
        <div>
            {JSON.stringify(user)}
            <Button onClick={doLogout}>Logout</Button>
        </div>
    );
}
