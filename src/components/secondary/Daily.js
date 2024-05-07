import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './styles/Daily.css';

const Daily = ({ day, handleSubmmit }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);

    useEffect(() => {
        const fetchOutfitsForDay = async () => {
            try {
                const response = await axios.get(`${apiUrl}day/${day}`);
                setOutfits(response.data.outfits);
            } catch (error) {
                console.error('Error fetching outfits for the day:', error);
            }
        };

        fetchOutfitsForDay();
    }, [apiUrl, day]);

    const handleSave = () => {
        if (outfits.length > 0) {
            handleSubmmit(outfits[selectedOutfitIndex]);
        }
    };

    const handleSelectOutfit = (index) => {
        setSelectedOutfitIndex(index);
    };

    return (
        <div className='daily-container'>
            <h3>Outfits for {day}</h3>
            <div className='outfit-list'>
                {outfits.map((outfit, index) => (
                    <div
                        key={index}
                        className={`outfit-item ${index === selectedOutfitIndex ? 'selected' : ''}`}
                        onClick={() => handleSelectOutfit(index)}
                    >
                        <img src={`data:image/jpeg;base64,${outfit.image}`} alt={`Outfit ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;
