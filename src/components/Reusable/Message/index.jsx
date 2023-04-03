// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { clearError, clearMessage } from '../../../reducers/generalSlice';
// Styles
import Styles from './styles.module.scss';

export const Message = (props) => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.general.error);
    const message = useSelector((state) => state.general.message);

    useEffect(() => {
        const timeout = setTimeout(() => {
            error && dispatch(clearError(''));
            message && dispatch(clearMessage(''));
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const onClose = () => {
        dispatch(clearError(''));
        dispatch(clearMessage(''));
    };

    return (
        <div id = { 'message' } className = { `${Styles.message} ${props.class}` }>
            { props.type === 'success' && <span>success</span> }
            { props.type === 'error' && <span>error</span> }
            <span>{ props.children }</span>
            <span
                className = { Styles.message_close_icon }
                onClick = { onClose }>x</span>
        </div>
    );
};
