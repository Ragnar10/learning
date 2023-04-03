// Routing
import { Outlet } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import { Notification } from '../Notification';
import { PopupContainer } from '../Popups';

export const Main = () => {
    return (
        <div className = { Styles.container }>
            <main className = { Styles.main }>
                <Outlet />
            </main>
            <PopupContainer />
            <Notification />
        </div>
    );
};
