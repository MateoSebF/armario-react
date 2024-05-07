import React from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './styles/Outfit.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Outfit = ({ makeOutfit, day, handleSubmmit }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [layers, setLayers] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState([]);


    const handleSave = async (event) => {
        event.preventDefault();
      
        const clothes = [layers[0][carouselIndex[0]],
        layers[1][carouselIndex[1]]];
        handleSubmmit(clothes);
    };

    useEffect(() => {
        const getLayers = async () => {
            try {
                const layers = [];
                const carouselIndex = [];
                const layersTypes = await axios.get(`${apiUrl}wardrobe/fe66cdfb-afb5-48a4-b3b9-d45635a8e200/layers`);
                for (let i = 0; i < layersTypes.data.length; i++) {
                    layers.push([]);
                    carouselIndex.push(0);
                    const answer = await axios.get(`${apiUrl}clothing/byType/aed01e26-1d1b-479e-a2aa-c8acc92f03c0/${layersTypes.data[i]}`);
                    layers[i] = answer.data;
                }
                console.log(layers);
                setLayers(layers);
                setCarouselIndex(carouselIndex);
            } catch (e) {
                console.log(e);
            }
        };
        const getOutfit = async () => {
            try {
                console.log(day);
                const layers = [];
                var answer = await axios.get(`${apiUrl}day/${day}`);
                answer.data.array.forEach((clothes,index) => {
                   layers[index] = clothes;
                });
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