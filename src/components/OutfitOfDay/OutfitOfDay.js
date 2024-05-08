import React, { useState, useEffect } from 'react';
import './OutfitOfDay.css';
import axios from 'axios';

// This component shows the outfit of the day.
const OutfitOfDay = ({ selectedDate }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [outfit, setOutfits] = useState([]);
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
    useEffect(() => {
        const fetchOutfitOfDay = async () => {
            try {               
                const response = await axios.get(`${apiUrl}/day/${selectedDate}`);
                const outfitOfDay = response.data;
                setOutfits([outfitOfDay]);
                console.log(outfit);
            } catch (error) {
                console.error('Error fetching outfit of the day:', error);
            }
        };

        fetchOutfitOfDay(); 
    }, [selectedDate, apiUrl, outfit]);
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
                                 
                             </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default OutfitOfDay;
