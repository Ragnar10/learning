// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { Navigate } from 'react-router-dom';
// Actions
import { filmsActions } from '../../actions';
// Styles
import Styles from './styles.module.scss';
// Components
import { Loader } from '../Reusable';

export const Films = () => {
    const dispatch = useDispatch();

    const isAuth = Boolean(useSelector((state) => state.auth.user).id);
    const loading = useSelector((state) => state.general.loading);
    const films = useSelector((state) => state.films.films);

    useEffect(() => {
        dispatch(filmsActions.getFilms());
    }, []);

    if (!localStorage.getItem('token') && !isAuth) return <Navigate to = { '/signin' } />;

    if (loading) {
        return (
            <div className = { Styles.container }>
                <Loader class = { Styles.loader } />
            </div>
        );
    }

    return (
        <div className = { Styles.container }>
            <ul>
                {
                    films.length > 0 && films.map((i, index) => {
                        return (
                            <li key = { index }>
                                <span><b>{ i.title }</b>{ ` (${i.year})` }</span>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};
