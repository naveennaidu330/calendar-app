import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, eachDayOfInterval, isToday, isSameMonth, isSameDay } from 'date-fns';
import { getdataBind } from '../actions/actions';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [days, setDays] = useState(null)
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        let _days = eachDayOfInterval({ start: startDate, end: endDate });
        let _bindedDates = getdataBind(_days)
        setDays(_bindedDates)
    }, [currentMonth])
    const handlePreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    // Getting Tithi Name as per the end date of Tithi.
    const getThithiName = (_day) => {
        return days?.find((day) => isSameDay(_day.gregorian, day.vikramSamvat.calcDate.Tithi.end))
    }
    
    return (
        <div className="calendar">
            <header className="calendar-header">
                <button onClick={handlePreviousMonth}>Previous</button>
                <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </header>
            <div className="calendar-grid">
                {weekDays?.map(day => (
                    <div key={day} className='day-name-container' >
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">
                {days?.map((day, dayIndex) => {
                    let _thithi = getThithiName(day)
                    return (isSameMonth(day.gregorian, currentMonth) ? <div key={dayIndex} className={`date-container ${isToday(day) ? 'today' : ''}`} >
                        <div className='thithi'>
                            {_thithi ? `${_thithi?.vikramSamvat?.calcDate?.Tithi?.name_en_IN} - ${format(_thithi?.vikramSamvat?.calcDate?.Tithi?.end, "HH:mm")}`
                                : day.vikramSamvat.amantaDate.Tithi.name_en_IN}
                        </div>
                        <div className='gregorian-date' >
                            {day?.vikramSamvat?.amantaDate?.Tithi?.name_en_IN === "Amavasya" && <img className='moon-icon' alt='Amavasya' src={require('../assets/Amavasya.png')} />}
                            {day?.vikramSamvat?.amantaDate?.Tithi?.name_en_IN === "Punnami" && <img className='moon-icon' alt='Purnima' src={require('../assets/Purnima.png')} />}
                            {format(day.gregorian, 'd')}<div className='thithi-date' >{_thithi ? _thithi?.vikramSamvat.calcDate.Tithi.ino + 1 : ''}</div>
                        </div>
                        <div className='nakshatra'>{day.vikramSamvat.amantaDate.Nakshatra.name_en_IN}</div>
                    </div> : <div key={dayIndex} className='date-container' ></div>
                    )
                })}
            </div>
        </div>
    );
};

export default Calendar;
