// Core
import { useDispatch } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
// Actions
import { actions } from '../../actions';
// Styles
import Styles from './styles.module.scss';

export const Banner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className = { Styles.container }>
            <div className = { Styles.banner } />
            <button onClick = { () => dispatch(actions.getActivity(navigate)) }>{ 'GET ACTIVITY' }</button>
        </div>
    );
};
