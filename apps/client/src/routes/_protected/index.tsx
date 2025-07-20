import CreateRepositoryForm from '@/components/forms/create-repository.form.tsx';
import RepositoriesList from '@/components/lists/repositories-list.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="container mx-auto">
            <CreateRepositoryForm />
            <Separator className="my-4" />
            <RepositoriesList />
        </div>
    );
}
