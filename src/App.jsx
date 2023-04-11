// Core
import { lazy } from 'react';
// Routing
import {
    createBrowserRouter, RouterProvider, Navigate,
} from 'react-router-dom';
// Components
import { Main } from './components';
// Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/AuthPages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/AuthPages/SignInPage'));
const FilmsPage = lazy(() => import('./pages/FilmsPage'));

const router = createBrowserRouter([
    {
        element:  <Main />,
        children: [
            {
                path:    '/',
                element: <HomePage />,
            },
            {
                path:    '/signup',
                element: <SignUpPage />,
            },
            {
                path:    '/signin',
                element: <SignInPage />,
            },
            {
                path:    '/films',
                element: <FilmsPage />,
            },
        ],
    },
    { path: '*', element: <Navigate to = '/' replace /> },
]);

const App = () => {
    return <RouterProvider router = { router } />;
};

export default App;
