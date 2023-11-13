// Core
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Routing
import { Link, NavLink } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import { Calendar } from '../Calendar';
import { ThemeBtn } from '../ThemeBtn';

export const Header = () => {
    const isAuth = Boolean(useSelector((state) => state.auth.user).id);

    const [date, setDate] = useState('--/--/--');

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_PATH}/realtime`);
        eventSource.onmessage = (event) => {
            const d = new Date(Number(event.data));
            setDate(d.toLocaleString());
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const onExit = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header id = { 'header' } className = { Styles.container }>
            <Link to = { '/' } className = { Styles.header_logo }>
                <span>{ 'Best3' }</span>
            </Link>
            <nav className = { Styles.header_nav }>
                {
                    localStorage.getItem('token') /* && isAuth */
                    && <NavLink
                        to = { '/films' }
                        className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                        { 'Top 3 films' }
                    </NavLink>
                }
            </nav>
            <div className = { Styles.header_auth }>
                <Calendar />
                <div className = { Styles.auth_date }>{ date }</div>
                <ThemeBtn />
                <div className = { Styles.auth_nav }>
                    {
                        !localStorage.getItem('token') && !isAuth
                            ? <>
                                <NavLink
                                    to = { '/signin' }
                                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                                    { 'Sign in' }
                                </NavLink>
                                <NavLink
                                    to = { '/signup' }
                                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                                    { 'Sign up' }
                                </NavLink>
                            </>
                            : <div onClick = { onExit } className = { Styles.nav_link }>{ 'Exit' }</div>
                    }
                </div>
            </div>
        </header>
    );
};
