import RegisterView from '@/views/register-view';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/register')({
    component: RouteComponent,
});

function RouteComponent() {
    return <RegisterView />;
}
