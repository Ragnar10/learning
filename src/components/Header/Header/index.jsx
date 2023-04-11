// Core
import { useSelector } from 'react-redux';
// Routing
import { Link, NavLink } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import { ThemeBtn } from '../ThemeBtn';

export const Header = () => {
    const isAuth = Boolean(useSelector((state) => state.auth.user).id);

    return (
        <header id = { 'header' } className = { Styles.container }>
            <Link to = { '/' } className = { Styles.header_logo }>
                <span>{ 'Best3' }</span>
            </Link>
            <div className = { Styles.header_menu }>
                <ThemeBtn />
                <nav className = { Styles.menu_nav }>
                    {
                        !localStorage.getItem('token') && !isAuth
                        && <>
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
                    }
                </nav>
            </div>
        </header>
    );
};
