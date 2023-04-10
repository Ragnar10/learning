// Styles
import Styles from './styles.module.scss';

export const SubmitBtn = (props) => {
    return <button
        type = { props.type || 'submit' }
        form = { props.form }
        className = { `${Styles.submit_btn} ${props.class}` }
        disabled = { props.disabled }>{ props.name }</button>;
};
