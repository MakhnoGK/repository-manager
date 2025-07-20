import { useEffect, useState } from 'react';
import { apiClient } from '@/api/apiClient.ts';
import CreateRepositoryForm from '@/components/forms/create-repository.form.tsx';
import RepositoriesList from '@/components/lists/repositories-list.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    const [, setUser] = useState<unknown>(null);

    useEffect(() => {
        apiClient
            .get<{
                user: unknown;
            }>('/users/me', { withCredentials: true })
            .then((response) => setUser(response.data));
    }, []);

    return (
        <div>
            <CreateRepositoryForm />
            <hr className="my-4" />
            <RepositoriesList />
        </div>
    );
}
