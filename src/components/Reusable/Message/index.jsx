// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { clearError, clearMessage } from '../../../reducers/generalSlice';
// Images
import { ReactComponent as CloseIcon } from '../../../theme/assets/icons/close.svg';
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
            { props.type === 'success' && <b className = { Styles.success }>success</b> }
            { props.type === 'error' && <b className = { Styles.error }>error</b> }
            <span>{ props.children }</span>
            <CloseIcon
                className = { Styles.message_close_icon }
                onClick = { onClose }
                alt = { 'close icon' } />
        </div>
    );
};
