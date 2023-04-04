// Core
import { lazy } from 'react';
// Routing
import {
    createBrowserRouter, RouterProvider, Navigate,
} from 'react-router-dom';
// Components
import { Banner, Main } from './components';
// Pages
const BannerPage = lazy(() => import('./pages/BannerPage'));
const Top10FilmsPage = lazy(() => import('./pages/Top10FilmsPage'));
const Top10SerialsPage = lazy(() => import('./pages/Top10SerialsPage'));

const router = createBrowserRouter([
    {
        element:  <Main />,
        children: [
            {
                path:    '/',
                element: <BannerPage />,
            },
            {
                path:    '/top10films',
                element: <Top10FilmsPage />,
            },
            {
                path:    '/top10serials',
                element: <Top10SerialsPage />,
            },
        ],
    },
    { path: '*', element: <Navigate to = '/' replace /> },
]);

const App = () => {
    return <RouterProvider router = { router } />;
};

export default App;
