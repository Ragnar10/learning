// Styles
import Styles from './styles.module.scss';

export const Home = () => {
    return (
        <div
            aria-busy = 'true' aria-label = 'Loading'
            role = 'progressbar' className = { Styles.container }>
            <div className = { Styles.swing }>
                <div className = { Styles.swing_l }></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className = { Styles.swing_r }></div>
            </div>
            <div className = { Styles.shadow }>
                <div className = { Styles.shadow_l }></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className = { Styles.shadow_r }></div>
            </div>
        </div>
    );
};
