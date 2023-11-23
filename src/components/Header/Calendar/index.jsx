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

const createCalendar = (availableHours, day) => {
    const tempCalendar = [];
    const startMonthDay = moment(day).startOf('month');
    const lastMonthDay = moment(day).daysInMonth();
    const firstWeekDay = (startMonthDay.day() === 0 ? 7 : startMonthDay.day()) - 1;
    const startAvailableDay = moment().startOf('day').valueOf();
    const endAvailableDay = moment().add(availableHours, 'hours').valueOf();

    for (let i = 0; i < 42; i++) {
        if (i < firstWeekDay || i + 1 > lastMonthDay + firstWeekDay) {
            tempCalendar[ i ] = null;
        } else {
            const dayOfMonth =  moment(day).date(i + 1 - firstWeekDay);

            tempCalendar[ i ] = {
                day:     i + 1 - firstWeekDay,
                weekDay: startMonthDay.date(i + 1 - firstWeekDay).day() === 0
                    ? 7 : startMonthDay.date(i + 1 - firstWeekDay).day(),
                month:      moment(day).month() + 1,
                year:       moment(day).year(),
                fullDate:   dayOfMonth.format('DD.MM.YYYY'),
                currentDay: moment().format('DD.MM.YYYY') === dayOfMonth.format('DD.MM.YYYY'),
                disabled:   availableHours
                    ? dayOfMonth.valueOf() < startAvailableDay || dayOfMonth.startOf('day').valueOf() > endAvailableDay
                    : false,
            };
        }
    }

    return !tempCalendar[ 35 ] ? tempCalendar.slice(0, 35) : tempCalendar;
};

export const Calendar = ({
    label = 'Дата:',
    availableHours = 48,
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
        setCalendar(createCalendar(availableHours));
    }, []);

    const onOpenCalendar = () => {
        if (isOpen) {
            setCurrentMonth(moment());
            setCalendar(createCalendar(availableHours, moment()));
        }
        setIsOpen(!isOpen);
    };

    const onChangeDate = (event) => {
        event.target.value.length > 0 && setChosenDate(null);
    };

    const onPrevMonth = () => {
        const day = currentMonth.subtract(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableHours, day));
    };

    const onNextMonth = () => {
        const day = currentMonth.add(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableHours, day));
    };

    const onSetDay = (day) => {
        setChosenDate(chosenDate?.fullDate === day?.fullDate ? null : day);
    };

    return (
        <div id = { 'calendar' } className = { Styles.container }>
            <div className = { `${Styles.text_field} ${classField || ''}` } data-icon = { icon }>
                <label htmlFor = { 'calendar_field' }>{ label }</label>
                <div onClick = { onOpenCalendar }>
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
