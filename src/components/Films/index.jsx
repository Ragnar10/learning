// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { Navigate } from 'react-router-dom';
// Mui
import Skeleton from '@mui/material/Skeleton';
// Actions
import { filmsActions } from '../../actions';
// Styles
import Styles from './styles.module.scss';

export const Films = () => {
    const dispatch = useDispatch();

    const isAuth = Boolean(useSelector((state) => state.auth.user).id);
    const loading = useSelector((state) => state.general.loading);
    const films = useSelector((state) => state.films.films);

    useEffect(() => {
        dispatch(filmsActions.getFilms());
    }, []);

    if (!localStorage.getItem('token') && !isAuth) return <Navigate to = { '/signin' } />;

    return (
        <div className = { Styles.container }>
            <ul className = { Styles.films }>
                {
                    loading
                        ? Array.from(new Array(5)).map((_, index) => {
                            return (
                                <li key = { index }>
                                    <Skeleton
                                        variant = { 'rectangular' }
                                        width = { 300 }
                                        height = { 450 }
                                        style = { { marginBottom: '30px' } } />
                                    <Skeleton variant = { 'text' } height = { 16 } />
                                    <Skeleton variant = { 'text' } height = { 16 } />
                                </li>
                            );
                        })
                        : films.map((i, index) => {
                            return (
                                <li key = { index } className = { Styles.film }>
                                    <img src = { i.poster } alt = { `Poster ${i.title}` } />
                                    <span><b>{ i.title }</b>{ ` (${i.year})` }</span>
                                </li>
                            );
                        })
                }
            </ul>
        </div>
    );
};
