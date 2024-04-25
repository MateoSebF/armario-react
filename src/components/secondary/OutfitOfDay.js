import React from 'react';
import './styles/OutfitOfDay.css';
import profileImage from './styles/profile.jpeg'; 

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
            <table className='outfit-table'>
                <thead>
                    <tr>
                        {weekDates.map((date, index) => (
                            <th key={index} className={date.getDate() === selectedDate.getDate() ? 'selected-day' : ''}>
                                <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div>{date.toLocaleDateString()}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {weekDates.map((date, index) => (
                            <td key={index}>
                                {date.getDate() === selectedDate.getDate() && (
                                    <img src={profileImage} alt='Profile' className='outfit-image' />
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




