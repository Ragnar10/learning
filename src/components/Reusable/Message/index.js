// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { clearError, clearMessage } from '../../../reducers/generalSlice';
// Styles
import Styles from './styles.module.scss';
// Images
import { ReactComponent as SuccessIcon } from '../../../theme/assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from '../../../theme/assets/icons/error.svg';
import { ReactComponent as CloseIcon } from '../../../theme/assets/icons/close.svg';

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
            { props.type === 'success' && <SuccessIcon alt = 'success icon' /> }
            { props.type === 'error' && <ErrorIcon alt = 'error icon' /> }
            <span>{ props.children }</span>
            <CloseIcon
                className = { Styles.message_close_icon }
                onClick = { onClose }
                alt = 'close icon' />
        </div>
    );
};
