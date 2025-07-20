import * as React from 'react';
import Navbar from '@/components/navbar.tsx';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    );
}
