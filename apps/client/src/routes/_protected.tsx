import Navbar from '@/components/navbar.tsx';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}
