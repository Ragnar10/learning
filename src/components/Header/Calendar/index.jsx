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
const timeArray = [
    { id: 0, value: '00-00' },
    { id: 1, value: '00-15' },
    { id: 2, value: '00-30' },
    { id: 3, value: '00-45' },
    { id: 4, value: '01-00' },
    { id: 5, value: '01-15' },
    { id: 6, value: '01-30' },
    { id: 7, value: '01-45' },
    { id: 8, value: '02-00' },
    { id: 9, value: '02-15' },
    { id: 10, value: '02-30' },
    { id: 11, value: '02-45' },
    { id: 12, value: '03-00' },
    { id: 13, value: '03-15' },
    { id: 14, value: '03-30' },
    { id: 15, value: '03-45' },
    { id: 16, value: '04-00' },
    { id: 17, value: '04-15' },
    { id: 18, value: '04-30' },
    { id: 19, value: '04-45' },
    { id: 20, value: '05-00' },
];

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
    labelCalendar = 'Дата:',
    labelTime = 'Час',
    availableHours = 48,
    withTime = false,
    icon = true,
    classContainer,
    classWrapper,
    classField,
    classCalendar,
}) => {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [calendar, setCalendar] = useState([]);
    const [chosenDate, setChosenDate] = useState(null);

    const [isOpenTime, setIsOpenTime] = useState(false);
    const [chosenTime, setChosenTime] = useState(null);

    useEffect(() => {
        setCurrentMonth(moment());
        setCalendar(createCalendar(availableHours));
    }, []);

    const onOpenCalendar = () => {
        if (isOpenCalendar) {
            setCurrentMonth(moment());
            setCalendar(createCalendar(availableHours, moment()));
        }
        setIsOpenCalendar(!isOpenCalendar);
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

    const onOpenTime = () => {
        setIsOpenTime(!isOpenTime);
    };

    const onChangeTime = (event) => {
        event.target.value.length > 0 && setChosenTime(null);
    };

    const onSetTime = (time) => {
        setChosenTime(chosenDate?.id === time?.id ? null : time);
        chosenDate?.id !== time?.id && setIsOpenTime(false);
    };

    return (
        <div id = { 'calendar' } className = { `${Styles.container} ${classContainer || ''}` }>
            <div className = { `${Styles.wrapper_calendar} ${classWrapper || ''}` }>
                <div className = { `${Styles.text_field} ${classField || ''}` } data-icon = { icon }>
                    <label htmlFor = { 'date_field' }>{ labelCalendar }</label>
                    <div onClick = { onOpenCalendar }>
                        <input
                            type = { 'text' } id = { 'date_field' }
                            name = { 'date_field' } value = { chosenDate?.fullDate || '' }
                            onChange = { onChangeDate } />
                        { icon && <CalendarIcon /> }
                    </div>
                </div>
                <div className = { `${Styles.calendar} ${classCalendar || ''}` } data-open = { isOpenCalendar }>
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
            <div className = { `${Styles.wrapper_time} ${classWrapper || ''}` }>
                <div className = { `${Styles.text_field} ${classField || ''}` }>
                    <label htmlFor = { 'time_field' }>{ labelTime }</label>
                    <div onClick = { onOpenTime }>
                        <input
                            type = { 'text' } id = { 'time_field' }
                            name = { 'time_field' } value = { chosenTime?.value || '' }
                            onChange = { onChangeTime } />
                    </div>
                </div>
                <div className = { Styles.time_list } data-open = { isOpenTime }>
                    {
                        timeArray.map((item) => {
                            return (
                                <span
                                    key = { item.id }
                                    onClick = { () => onSetTime(item) }>
                                    { item.value }
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};
