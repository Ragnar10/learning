// Styles
import Styles from './styles.module.scss';
// Components
import { ThemeBtn } from '../ThemeBtn';

export const Header = () => {
    return (
        <header id = { 'header' } className = { Styles.container }>
            <ThemeBtn />
        </header>
    );
};
