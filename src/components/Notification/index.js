// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';
// Components
import { Message } from '../Reusable';

export const Notification = () => {
    const error = useSelector((state) => state.general.error);
    const message = useSelector((state) => state.general.message);

    return (
        <>
            { error && <Message type = { 'error' } class = { Styles.error }>{ error }</Message> }
            { message && <Message type = { 'success' } class = { Styles.success }>{ message }</Message> }
        </>
    );
};
