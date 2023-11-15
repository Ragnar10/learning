// Core
import { useState, useEffect } from 'react';
// Instruments
import moment from 'moment';
// Styles
import Styles from './styles.module.scss';

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд'];
const months = {
    1:  'Січень',
    2:  'Лютий',
    3:  'Березень',
    4:  'Квітень',
    5:  'Травень',
    6:  'Червень',
    7:  'Липень',
    8:  'Серпень',
    9:  'Вересень',
    10: 'Жовтень',
    11: 'Листопад',
    12: 'Грудень',
};

const createCalendar = (day) => {
    const startMonthDay = moment(day).startOf('month');
    const firstWeekDay = (startMonthDay.day() === 0 ? 7 : startMonthDay.day()) - 1;
    const lastMonthDay = moment(day).daysInMonth();
    const tempCalendar = [];

    for (let i = 0; i < 42; i++) {
        if (i < firstWeekDay || i + 1 > lastMonthDay + firstWeekDay) {
            tempCalendar[ i ] = null;
        } else {
            tempCalendar[ i ] = {
                day:     i + 1 - firstWeekDay,
                weekDay: startMonthDay.date(i + 1 - firstWeekDay).day() === 0
                    ? 7 : startMonthDay.date(i + 1 - firstWeekDay).day(),
                month:    moment(day).month() + 1,
                year:     moment(day).year(),
                fullDate: moment(day).date(i + 1 - firstWeekDay).format('DD.MM.YYYY'),
            };
        }
    }

    return !tempCalendar[ 35 ] ? tempCalendar.slice(0, 35) : tempCalendar;
};

export const Calendar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState(null);
    const [calendar, setCalendar] = useState([]);
    const [chosenDate, setChosenDate] = useState(null);

    useEffect(() => {
        setCurrentDay(moment());
        setCalendar(createCalendar());
    }, []);

    const onChangeDate = (event) => {
        event.target.value.length > 0 && setChosenDate(null);
    };

    const onPrevMonth = () => {
        const day = currentDay.subtract(1, 'month');

        setCurrentDay(day);
        setCalendar(createCalendar(day));
    };

    const onNextMonth = () => {
        const day = currentDay.add(1, 'month');

        setCurrentDay(day);
        setCalendar(createCalendar(day));
    };

    const onSetDay = (day) => {
        setChosenDate(day);
        setIsOpen(false);
    };

    console.log(calendar);

    return (
        <div id = { 'calendar' } className = { Styles.container }>
            <div className = { Styles.text_field }>
                <label htmlFor = { 'calendar_field' }>{ 'Коли нагадати:' }</label>
                <input
                    type = { 'text' } id = { 'calendar_field' }
                    name = { 'calendar' } value = { chosenDate?.fullDate || '' }
                    onChange = { onChangeDate } onClick = { () => setIsOpen(!isOpen) } />
            </div>
            <div className = { Styles.calendar } data-open = { isOpen }>
                <div className = { Styles.calendar_month }>
                    <span className = { Styles.month_btn } onClick = { onPrevMonth }>{ '<' }</span>
                    <span className = { Styles.month_date }>{ currentDay && `${months[ currentDay?.format('M') ]} ${currentDay?.format('YYYY')}` }</span>
                    <span className = { Styles.month_btn } onClick = { onNextMonth }>{ '>' }</span>
                </div>
                <div className = { Styles.calendar_week }>
                    {
                        weekDays.map((d) => {
                            return <span key = { d }>{ d }</span>;
                        })
                    }
                </div>
                <div className = { Styles.calendar_days }>
                    {
                        calendar.length > 0 && calendar.map((day, index) => {
                            if (!day) return <span key = { index } />;

                            return <span
                                key = { index }
                                onClick = { () => onSetDay(day) }
                                data-chosen = { chosenDate?.fullDate === day?.fullDate }
                                data-empty = { false }>
                                { day?.day }
                            </span>;
                        })
                    }
                </div>
            </div>
        </div>
    );
};
