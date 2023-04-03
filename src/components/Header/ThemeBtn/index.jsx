// Core
import { useEffect, useState } from 'react';
// Styles
import Styles from './styles.module.scss';
// Images
import { ReactComponent as LightIcon } from '../../../theme/assets/icons/theme_light.svg';
import { ReactComponent as DarkIcon } from '../../../theme/assets/icons/theme_dark.svg';

export const ThemeBtn = () => {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = `${theme}`;
    }, [theme]);

    return (
        theme
            ? <LightIcon
                id = { 'light_theme' }
                onClick = { () => setTheme(!theme) }
                className = { Styles.theme }
                alt = { 'theme icon' } />
            : <DarkIcon
                id = { 'dark_theme' }
                onClick = { () => setTheme(!theme) }
                className = { Styles.theme }
                alt = { 'theme icon' } />

    );
};
