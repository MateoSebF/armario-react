import React, { useState, useEffect } from 'react';
import './Daily.css';
import apiClient from '../../services/apiClient';
import { useTranslation } from 'react-i18next';
import '../../i18n';


const Daily = ({ day, handleSubmmit }) => {
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);

    const { t } = useTranslation();

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
            <h2>{t('Daily Outfits')}</h2> 
            <div className='outfit-list'>
                {outfits.map((outfit, index) => (
                    <div
                        key={index}
                        className={`outfit-item ${index === selectedOutfitIndex ? 'selected' : ''}`}
                        onClick={() => handleSelectOutfit(index)}
                    >
                        <img className={outfit.type} src={`data:image/jpeg;base64,${outfit.image}`} alt={t('Outfit', { count: index + 1 })} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;
