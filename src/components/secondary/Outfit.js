import React from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './styles/Outfit.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Outfit = ({ makeOutfit, day, handleSubmmit }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [layers, setLayers] = useState([[], [], []]);
    const carouselIndex = [0, 0, 0];


    const handleSave = async (event) => {
        event.preventDefault();
        const clothes = [layers[0][carouselIndex[0]],
        layers[1][carouselIndex[1]], layers[2][carouselIndex[2]]];
        handleSubmmit(clothes);
    };

    useEffect(() => {
        const getLayers = async () => {
            try {
                const layers = [];
                var answer = await axios.get(`https://clothcraft.azurewebsites.net/clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/SHIRT`);
                layers[0] = answer.data;
                answer = await axios.get(`https://clothcraft.azurewebsites.net/clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/PANTS`);
                layers[1] = answer.data;
                answer = await axios.get(`https://clothcraft.azurewebsites.net/clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/SHOES`);
                layers[2] = answer.data;
                setLayers(layers);
            } catch (e) {
                console.log(e);
            }
        };
        const getOutfit = async () => {
            try {
                console.log(day);
                const layers = [];
                var answer = await axios.get(`https://clothcraft.azurewebsites.net/day/${day}`);
                layers[0] = [answer.data.clothes[0]];
                layers[1] = [answer.data.clothes[1]];
                layers[2] = [answer.data.clothes[2]];
                setLayers(layers);
            } catch (e) {
                console.log(e);
            }
        }
        if (makeOutfit) getLayers();
        else getOutfit();
    }, [apiUrl, makeOutfit, day]);

    return (
        <div className='row col-10 offset-1'>
            {layers.map((layer, index) => (
                <Carousel key={index} clothes={layer} makeOutfit={makeOutfit}
                    handleChange={(clohingIndex) => {
                        carouselIndex[index] = clohingIndex;
                    }} />
            ))}
            <Button onClick={handleSave} className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>

        </div>

    );
}

export default Outfit;
