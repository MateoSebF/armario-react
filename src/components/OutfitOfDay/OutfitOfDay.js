import React from 'react';
import './OutfitOfDay.css';
import Daily from './Daily';

const OutfitOfDay = ({ selectedDate }) => {

    const getWeekDates = (selectedDate) => {
        const startDate = new Date(selectedDate);
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i - 3);
            weekDates.push(currentDate);
        }
        return weekDates;
    };

    const weekDates = getWeekDates(selectedDate);

    return (
        <div className='outfit-container'>
            <table className='table outfit-table'>
                <thead>
                    <tr>
                        {weekDates.map((date, index) => (
                            <th
                                key={index}
                                className={date.getDate() === selectedDate.getDate() ? 'col selected-day' : 'col'}
                                style={{width: index === 3 ? '52%' : '8%' }}
                            >
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                {index === 3 && <br />}
                                {index === 3 && date.toLocaleDateString()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {weekDates.map((date, index) => (
                            <td key={index}>
                                {date.getDate() === selectedDate.getDate() && (
                                    <Daily day={date} handleSubmmit={() => {}} />
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OutfitOfDay;
