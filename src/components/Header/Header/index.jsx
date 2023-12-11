// Core
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Routing
import { Link, NavLink } from 'react-router-dom';
// Instruments
import moment from 'moment';
// Styles
import Styles from './styles.module.scss';
// Components
import { Calendar } from '../Calendar';
import { ThemeBtn } from '../ThemeBtn';

export const Header = () => {
    const isAuth = Boolean(useSelector((state) => state.auth.user).id);

    const [time, setTime] = useState('--/--/--');

    const [startDay, setStartDay] = useState({ day: null });
    const [endDay, setEndDay] = useState({ day: null });
    const [errorCalendar, setErrorCalendar] = useState('');

    // useEffect(() => {
    //     const eventSource = new EventSource(`${import.meta.env.VITE_API_PATH}/realtime`);
    //     eventSource.onmessage = (event) => {
    //         const d = new Date(Number(event.data));
    //         setTime(d.toLocaleString());
    //     };
    //
    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);

    const onSetFullDate = (date, type) => {
        if (type === 'start') {
            setStartDay(date?.day && endDay?.day?.unixTime <= date?.day?.unixTime ? { day: null } : date);
            date?.day && endDay?.day?.unixTime <= date?.day?.unixTime ? setErrorCalendar('start') : setErrorCalendar('');
        }

        if (type === 'end') {
            setEndDay(date?.day && startDay?.day?.unixTime >= date?.day?.unixTime ? { day: null } : date);
            date?.day && startDay?.day?.unixTime > date?.day?.unixTime ? setErrorCalendar('end') : setErrorCalendar('');
        }
    };

    const onSaveDate = () => {
        if (!startDay?.day?.fullDate) return setErrorCalendar('start');
        if (!endDay?.day?.fullDate) return setErrorCalendar('end');

        console.log(startDay, endDay);
    };

    const onExit = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <header id = { 'header' } className = { Styles.container }>
            <Link to = { '/' } className = { Styles.header_logo }>
                <span>{ 'Best3' }</span>
            </Link>
            <nav className = { Styles.header_nav }>
                {
                    localStorage.getItem('token') /* && isAuth */
                    && <NavLink
                        to = { '/films' }
                        className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link }>
                        { 'Top 3 films' }
                    </NavLink>
                }
            </nav>
            <div className = { Styles.calendar_wrapper }>
                <Calendar
                    labelCalendar = { 'Начальная дата:' }
                    fullDate = { startDay }
                    onSetFullDate = { (day) => onSetFullDate(day, 'start') }
                    availableHours = { 24 * 90 }
                    withTime = { false }
                    error = { errorCalendar && errorCalendar === 'start' ? 'day' : '' }
                    classContainer = { Styles.calendar } />
                <Calendar
                    labelCalendar = { 'Конечная дата:' }
                    fullDate = { endDay }
                    onSetFullDate = { (day) => onSetFullDate(day, 'end') }
                    availableHours = { 24 * 90 }
                    withTime = { false }
                    error = { errorCalendar && errorCalendar === 'end' ? 'day' : '' }
                    classContainer = { Styles.calendar } />
                <button className = { Styles.button } onClick = { onSaveDate }>Save</button>
            </div>
            <div className = { Styles.header_auth }>
                <div className = { Styles.auth_date }>{ time }</div>
                <ThemeBtn />
                <div className = { Styles.auth_nav }>
                    {
                        !localStorage.getItem('token') && !isAuth
                            ? <>
                                <NavLink
                                    to = { '/signin' }
                                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link}>
                                    { 'Sign in' }
                                </NavLink>
                                <NavLink
                                    to = { '/signup' }
                                    className = { ({ isActive }) => isActive ? Styles.nav_active_link : Styles.nav_link}>
                                    { 'Sign up' }
                                </NavLink>
                            </>
                            : <div onClick = { onExit } className = { Styles.nav_link }>{ 'Exit' }</div>
                    }
                </div>
            </div>
        </header>
    );
};
