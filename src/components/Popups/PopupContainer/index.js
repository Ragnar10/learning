// Core
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { setPopup } from '../../../reducers/interactiveSlice';
// Constants
import { popupNames } from '../../../constants';
// Styles
import Styles from './styles.module.scss';
// Components

export const PopupContainer = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state) => state.interactive.popup);

    if (!popup.name) return null;

    return (
        <section className = { Styles.container }>
            <div className = { Styles.popup }>

            </div>
        </section>
    );
};
