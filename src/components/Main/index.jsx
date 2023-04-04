// Core
import { Suspense } from 'react';
// Routing
import { Outlet } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import { Header } from '../Header';
import { Notification } from '../Notification';
import { PopupContainer } from '../Popups';
import { Loader } from '../Reusable';

export const Main = () => {
    return (
        <div className = { Styles.container }>
            <Header />
            <main className = { Styles.main }>
                <Suspense fallback = { <Loader /> }>
                    <Outlet />
                </Suspense>
            </main>
            <PopupContainer />
            <Notification />
        </div>
    );
};
