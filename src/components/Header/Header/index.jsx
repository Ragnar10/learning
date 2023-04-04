// Routing
import { Link, NavLink } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import { ThemeBtn } from '../ThemeBtn';

export const Header = () => {
    return (
        <header id = { 'header' } className = { Styles.container }>
            <Link to = { '/' } className = { Styles.header_logo }>
                <span>{ 'Топовая' }</span>
                <span>{ 'Киношечка' }</span>
            </Link>
            <nav className = { Styles.header_nav }>
                <NavLink
                    to = { '/top10films' }
                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                    { 'Топ 10 фильмов' }
                </NavLink>
                <NavLink
                    to = { '/top10serials' }
                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                    { 'Топ 10 сериалов' }
                </NavLink>
            </nav>
            <ThemeBtn />
        </header>
    );
};
