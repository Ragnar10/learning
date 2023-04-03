// Routing
import {
    Routes, Navigate, Route, Outlet,
} from 'react-router-dom';
// Components
import { Main } from './components';
// Pages
import { BannerPage } from './pages';

const App = () => {
    return (
        <Routes>
            <Route element = { <Main /> } >
                <Route index element = { <BannerPage /> } />
            </Route>

            <Route path = '*' element = { <Navigate to = '/' replace /> } />
        </Routes>
    );
};

export default App;
