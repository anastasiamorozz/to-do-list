import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';

export const publicRoutes = [
    {path: "/", element: MainPage},
    {path: "/auth/login", element: LoginPage},
];

export const userRoutes = [
    {path: "/", element: MainPage},
];