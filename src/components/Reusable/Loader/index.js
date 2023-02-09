// Styles
import Styles from './styles.module.scss';

export const Loader = (props) => {
    return <span id = { 'loader' } className = { `${Styles.loader} ${props.class}` } />;
};
