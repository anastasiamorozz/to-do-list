import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';
import ProfilePage from '../components/pages/ProfilePage';
import RegPage from '../components/pages/RegPage';
import StartPage from '../components/pages/StartPage';

export const publicRoutes = [
    {path: "/", element: StartPage},
    {path: "/auth/login", element: LoginPage},
    {path: "/auth/reg", element: RegPage},
    
];

export const userRoutes = [
    {path: "/", element: StartPage},
    {path: "/profile", element: ProfilePage},
    {path: "/main", element: MainPage},
];