import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';
import RegPage from '../components/pages/RegPage';
import StartPage from '../components/pages/StartPage';

export const publicRoutes = [
    {path: "/", element: StartPage},
    {path: "/auth/login", element: LoginPage},
    {path: "/auth/reg", element: RegPage},
    {path: "/main", element: MainPage},
];

export const userRoutes = [
    {path: "/", element: StartPage},
    
];