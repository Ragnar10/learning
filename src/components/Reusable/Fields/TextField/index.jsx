// Styles
import Styles from './styles.module.scss';

export const TextField = (props) => {
    if (!props.name || !props.register) return null;

    return (
        <div className = { `${Styles.text_field} ${props.class}` }>
            <label htmlFor = { props.name }>
                <span>{ props.label }</span>
                { props.required && <span>{ ' *' }</span> }
            </label>
            <input
                className = { props.error && Styles.error_border }
                id = { props.name }
                placeholder = { props?.placeholder }
                { ...props.register(props.name) } />
            <div>
                { props.error && <span>{ props.error.message }</span> }
            </div>
        </div>
    );
};
