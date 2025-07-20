import axios from 'axios';

const ALLOWED_ROUTES = ['/login', '/register'];

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401 && !ALLOWED_ROUTES.includes(window.location.pathname)) {
            window.location.href = '/login';
        }
    },
);
