// Core
import { useState, useEffect, useRef } from 'react';
// Instruments
import moment from 'moment';
// Hooks
import { useOutsideClick } from '../../../hooks';
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

const createCalendar = (availableHours, day, formatDate) => {
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
                fullDate:   dayOfMonth.format(formatDate || 'DD-MM-YYYY'),
                unixTime:   moment().set({ year: moment(day).year(), month: moment(day).month() + 1, date: i + 1 - firstWeekDay }).valueOf(),
                currentDay: moment().format(formatDate || 'DD-MM-YYYY') === dayOfMonth.format(formatDate || 'DD-MM-YYYY'),
                disabled:   availableHours
                    ? dayOfMonth.valueOf() < startAvailableDay || dayOfMonth.startOf('day').valueOf() > endAvailableDay
                    : false,
            };
        }
    }

    return !tempCalendar[ 35 ] ? tempCalendar.slice(0, 35) : tempCalendar;
};

const createTimeArray = (divisionStep, separatorTime, fullDate, availableHours) => {
    const tempTimeArray = [];
    const dayMinutes = 24 * 60;
    const arrayLength = dayMinutes / divisionStep;
    const hourParts = 60 / divisionStep;
    const isLimitPart = fullDate?.day?.day === Number(moment().add(availableHours, 'hours').format('DD'));
    const limitHour = isLimitPart && moment().add(availableHours, 'hours').hour();
    const limitMinute = isLimitPart && moment().add(availableHours, 'hours').minute();

    for (let i = 0; i < arrayLength; i++) {
        const hour = Math.floor(i / hourParts);
        const minuteFromStart = i * divisionStep;
        const minute = i === 0 || i % hourParts === 0 ? 0 : minuteFromStart % 60;

        const tempDisabled = limitHour === hour && minute > limitMinute;
        const disabled = hour > limitHour || tempDisabled;

        tempTimeArray[ i ] = {
            id:       i,
            hour,
            minute,
            fullTime: `${hour > 9 ? hour : `0${hour}`}${separatorTime || ':'}${minute > 9 ? minute : `0${minute}`}`,
            disabled: !isLimitPart ? false : disabled,
        };
    }

    return tempTimeArray;
};

export const Calendar = ({
    fullDate,
    onSetFullDate,
    labelCalendar = 'Дата:',
    availableHours = 48,
    isIcon = false,
    formatDate = 'DD-MM-YYYY',
    withTime = true,
    labelTime = 'Час:',
    separatorTime = ':',
    divisionStep = 5,
    error,
    classContainer,
    classWrapper,
    classField,
    classCalendar,
}) => {
    return (
        <div id = { 'calendar' } className = { `${Styles.container} ${classContainer || ''}` }>
            <ChooseDateField
                fullDate = { fullDate }
                onSetFullDate = { onSetFullDate }
                labelCalendar = { labelCalendar }
                availableHours = { availableHours }
                formatDate = { formatDate }
                isIcon = { isIcon }
                withTime = { withTime }
                error = { error === 'day' }
                classWrapper = { classWrapper }
                classField = { classField }
                classCalendar = { classCalendar } />
            {
                withTime
                && <ChooseTimeField
                    fullDate = { fullDate }
                    onSetFullDate = { onSetFullDate }
                    availableHours = { availableHours }
                    labelTime = { labelTime }
                    divisionStep = { divisionStep }
                    separatorTime = { separatorTime }
                    error = { error === 'time' }
                    classWrapper = { classWrapper }
                    classField = { classField } />
            }
        </div>
    );
};

const ChooseDateField = ({
    fullDate,
    onSetFullDate,
    labelCalendar,
    availableHours,
    formatDate,
    isIcon,
    withTime,
    error,
    classWrapper,
    classField,
    classCalendar,
}) => {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [calendar, setCalendar] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        setCurrentMonth(moment());
        setCalendar(createCalendar(availableHours, moment(), formatDate));
    }, []);

    const onOpenCalendar = () => {
        if (isOpenCalendar) {
            setCurrentMonth(moment());
            setCalendar(createCalendar(availableHours, moment(), formatDate));
        }
        setIsOpenCalendar(!isOpenCalendar);
    };

    useOutsideClick(ref, isOpenCalendar, onOpenCalendar);

    const onChangeDate = (event) => {
        event.target.value.length > 0 && onSetFullDate(withTime ? { day: null, time: null } : { day: null });
    };

    const onPrevMonth = () => {
        const day = currentMonth.subtract(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableHours, day, formatDate));
    };

    const onNextMonth = () => {
        const day = currentMonth.add(1, 'month');

        setCurrentMonth(day);
        setCalendar(createCalendar(availableHours, day, formatDate));
    };

    const onSetDay = (day) => {
        onSetFullDate(withTime
            ? { day: fullDate?.day?.fullDate === day?.fullDate ? null : day, time: null }
            : { day: fullDate?.day?.fullDate === day?.fullDate ? null : day });
        setIsOpenCalendar(false);
    };

    return (
        <div ref = { ref } className = { `${Styles.wrapper_calendar} ${classWrapper || ''}` }>
            <div className = { `${Styles.text_field} ${classField || ''}` } data-icon = { isIcon }>
                <label htmlFor = { 'date_field' }>{ labelCalendar }</label>
                <div onClick = { onOpenCalendar }>
                    <input
                        type = { 'text' }
                        id = { 'date_field' }
                        name = { 'date_field' }
                        placeholder = { 'дд.мм.рррр' }
                        value = { fullDate?.day?.fullDate || '' }
                        onChange = { onChangeDate }
                        data-error = { error } />
                    { isIcon && <CalendarIcon /> }
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
                                data-chosen = { fullDate?.day?.fullDate === day?.fullDate }
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

const ChooseTimeField = ({
    fullDate,
    onSetFullDate,
    availableHours,
    labelTime,
    divisionStep,
    separatorTime,
    error,
    classWrapper,
    classField,
}) => {
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [timeArray, setTimeArray] = useState([]);

    const ref = useRef(null);

    useEffect(() => {
        setTimeArray(createTimeArray(divisionStep, separatorTime, fullDate, availableHours));
    }, [fullDate?.day]);

    useOutsideClick(ref, isOpenTime, () => {
        setIsOpenTime(false);
    });


    const onOpenTime = () => {
        setIsOpenTime(!isOpenTime);
    };

    const onChangeTime = (event) => {
        event.target.value.length > 0 && onSetFullDate({ ...fullDate, time: null });
    };

    const onSetTime = (time) => {
        onSetFullDate({ ...fullDate, time: fullDate?.time?.id === time?.id ? null : time });
        fullDate?.time?.id !== time?.id && setIsOpenTime(false);
    };

    return (
        <div ref = { ref } className = { `${Styles.wrapper_time} ${classWrapper || ''}` }>
            <div className = { `${Styles.text_field} ${classField || ''}` }>
                <label htmlFor = { 'time_field' }>{ labelTime }</label>
                <div onClick = { onOpenTime }>
                    <input
                        type = { 'text' }
                        id = { 'time_field' }
                        name = { 'time_field' }
                        placeholder = { 'гг:хх' }
                        value = { fullDate?.time?.fullTime || '' }
                        onChange = { onChangeTime }
                        data-error = { error } />
                </div>
            </div>
            <div className = { Styles.time_list } data-open = { isOpenTime }>
                {
                    timeArray?.length > 0
                    && timeArray.map((item) => {
                        return (
                            <span
                                key = { item.id }
                                data-disabled = { item?.disabled }
                                onClick = { () => onSetTime(item) }>
                                { item.fullTime }
                            </span>
                        );
                    })
                }
            </div>
        </div>
    );
};
