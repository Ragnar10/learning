// Core
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { setPopup } from '../../../reducers/interactiveSlice';
// Constants
import { popupNames } from '../../../constants';
// Styles
import Styles from './styles.module.scss';
// Images
import { ReactComponent as CloseIcon } from '../../../theme/assets/icons/close.svg';
// Components

export const PopupContainer = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state) => state.interactive.popup);

    if (!popup.name) return null;

    const onClose = () => {
        dispatch(setPopup({}));
    };

    return (
        <section className = { Styles.container }>
            <div className = { Styles.popup }>
                <div className = { Styles.header }>
                    <h3>{ 'Title' }</h3>
                    <CloseIcon
                        onClick = { onClose }
                        alt = { 'close icon' } />
                </div>
            </div>
        </section>
    );
};
