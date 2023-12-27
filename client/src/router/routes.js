import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';
import StartPage from '../components/pages/StartPage';

export const publicRoutes = [
    {path: "/", element: StartPage},
    {path: "/auth/login", element: LoginPage},
];

export const userRoutes = [
    {path: "/", element: StartPage},
];