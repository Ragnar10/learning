// Core
import { useState, useEffect } from 'react';
// Instruments
import moment from 'moment';
// Images
import { ReactComponent as CalendarIcon } from '../../../theme/assets/icons/calendar.svg';
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

const createCalendar = (availableDays, day) => {
    const today = moment();
    const startDay = today.valueOf();
    const endDay = moment().add(availableDays, 'days').valueOf();
    const startMonthDay = moment(day).startOf('month');
    const firstWeekDay = (startMonthDay.day() === 0 ? 7 : startMonthDay.day()) - 1;
    const lastMonthDay = moment(day).daysInMonth();
    const tempCalendar = [];

    for (let i = 0; i < 42; i++) {
        if (i < firstWeekDay || i + 1 > lastMonthDay + firstWeekDay) {
            tempCalendar[ i ] = null;
        } else {
            const tempDay =  moment(day).date(i + 1 - firstWeekDay);

            tempCalendar[ i ] = {
                day:     i + 1 - firstWeekDay,
                weekDay: startMonthDay.date(i + 1 - firstWeekDay).day() === 0
                    ? 7 : startMonthDay.date(i + 1 - firstWeekDay).day(),
                month:      moment(day).month() + 1,
                year:       moment(day).year(),
                fullDate:   tempDay.format('DD.MM.YYYY'),
                currentDay: today.format('DD.MM.YYYY') === tempDay.format('DD.MM.YYYY'),
                disabled:   availableDays
                    ? tempDay.valueOf() < startDay || tempDay.valueOf() > endDay
                    : false,
            };
        }
    }

    return !tempCalendar[ 35 ] ? tempCalendar.slice(0, 35) : tempCalendar;
};

export const Calendar = ({
    label = 'Дата:',
    availableDays = 2,
    icon = true,
    classField,
    classCalendar,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [calendar, setCalendar] = useState([]);
    const [chosenDate, setChosenDate] = useState(null);

    useEffect(() => {
        setCurrentMonth(moment());
        setCalendar(createCalendar(availableDays));
    }, []);

    const onChangeDate = (event) => {
        event.target.value.length > 0 && setChosenDate(null);
    };

    const onPrevMonth = () => {
        const day = currentMonth.subtract(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableDays, day));
    };

    const onNextMonth = () => {
        const day = currentMonth.add(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableDays, day));
    };

    const onSetDay = (day) => {
        setChosenDate(chosenDate?.fullDate === day?.fullDate ? null : day);
    };

    return (
        <div id = { 'calendar' } className = { Styles.container }>
            <div className = { `${Styles.text_field} ${classField || ''}` } data-icon = { icon }>
                <label htmlFor = { 'calendar_field' }>{ label }</label>
                <div onClick = { () => setIsOpen(!isOpen) }>
                    <input
                        type = { 'text' } id = { 'calendar_field' }
                        name = { 'calendar' } value = { chosenDate?.fullDate || '' }
                        onChange = { onChangeDate } />
                    { icon && <CalendarIcon /> }
                </div>
            </div>
            <div className = { `${Styles.calendar} ${classCalendar || ''}` } data-open = { isOpen }>
                <div className = { Styles.calendar_month }>
                    <span className = { Styles.month_btn } onClick = { onPrevMonth }>{ '<' }</span>
                    <span className = { Styles.month_date }>{ currentMonth && `${months[ currentMonth?.format('M') ]} ${currentMonth?.format('YYYY')}` }</span>
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
                                onClick = { () => !day?.disabled && onSetDay(day) }
                                data-current = { day?.currentDay }
                                data-chosen = { chosenDate?.fullDate === day?.fullDate }
                                data-disabled = { day?.disabled }
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
