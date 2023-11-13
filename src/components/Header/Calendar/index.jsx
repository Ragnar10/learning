// Core
import { useState } from 'react';
// Instruments
import moment from 'moment';
// Styles
import Styles from './styles.module.scss';

const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];
const calendar = [
    { id: 1, date: 1 }, { id: 2, date: 2 }, { id: 3, date: 3 }, { id: 4, date: 4 }, { id: 5, date: 5 },
    { id: 6, date: 6 }, { id: 7, date: 7 }, { id: 8, date: 8 }, { id: 9, date: 9 }, { id: 10, date: 10 },
    { id: 11, date: 11 }, { id: 12, date: 12 }, { id: 13, date: 13 }, { id: 14, date: 14 }, { id: 15, date: 15 },
    { id: 16, date: 16 }, { id: 17, date: 17 }, { id: 18, date: 18 }, { id: 19, date: 19 }, { id: 20, date: 20 },
    { id: 21, date: 21 }, { id: 22, date: 22 }, { id: 23, date: 23 }, { id: 24, date: 24 }, { id: 25, date: 25 },
    { id: 26, date: 26 }, { id: 27, date: 27 }, { id: 28, date: 28 }, { id: 29, date: 29 }, { id: 30, date: 30 },
    { id: 31, date: 31 },
];

export const Calendar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenDate, setChosenDate] = useState({});

    const onChangeDate = (event) => {
        setChosenDate(event.target.value);
    };

    const onSetDay = (day) => {
        setChosenDate(day);
        setIsOpen(false);
    };

    return (
        <div id = { 'calendar' } className = { Styles.container }>
            <div className = { Styles.text_field }>
                <label htmlFor = { 'calendar_field' }>{ 'Коли нагадати:' }</label>
                <input
                    type = { 'text' } id = { 'calendar_field' }
                    name = { 'calendar' } value = { chosenDate?.date ? `${chosenDate.date}.10.2023` : '' }
                    onChange = { onChangeDate } onClick = { () => setIsOpen(!isOpen) } />
            </div>
            <div className = { Styles.calendar } data-open = { isOpen }>
                <div className = { Styles.calendar_month }>
                    <span className = { Styles.month_btn }>{ '<' }</span>
                    <span className = { Styles.month_date }>{ 'Жовтень 2023' }</span>
                    <span className = { Styles.month_btn }>{ '>' }</span>
                </div>
                <div className = { Styles.calendar_week }>
                    {
                        week.map((d) => {
                            return <span key = { d }>{ d }</span>;
                        })
                    }
                </div>
                <div className = { Styles.calendar_days }>
                    {
                        calendar.map((day) => {
                            return <span
                                key = { day.id } onClick = { () => onSetDay(day) }
                                data-chosen = { chosenDate.date === day.date }>{ day.date }</span>;
                        })
                    }
                </div>
            </div>
        </div>
    );
};
