import React, { useState, useEffect } from 'react';
import './Daily.css';
import apiClient from '../../services/apiClient';

const Daily = ({ day, handleSubmmit }) => {
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);

    useEffect(() => {
        const fetchOutfitsForDay = async () => {
            try {
                const formattedDate = day.toISOString().split('T')[0];
                const response = await apiClient.get(`day/${formattedDate}`);
                console.log("Response:", response);
                setOutfits(response.data);
            } catch (error) {
                console.error('Error fetching outfits for the day:', error);
                setOutfits([]);
            }
        };

        fetchOutfitsForDay();
    }, [day]);

    const handleSelectOutfit = (index) => {
        setSelectedOutfitIndex(index);
    };

    return (
        <div className='daily-container'>
            
            <div className='outfit-list'>
                {outfits.map((outfit, index) => (
                    <div
                        key={index}
                        className={`outfit-item ${index === selectedOutfitIndex ? 'selected' : ''}`}
                        onClick={() => handleSelectOutfit(index)}
                    >
                        <img className={outfit.type} src={`data:image/jpeg;base64,${outfit.image}`} alt={`Outfit ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;
