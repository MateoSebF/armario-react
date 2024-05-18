import React, { useState, useEffect } from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './Outfit.css';
import apiClient from '../../services/apiClient';

// This component is used to show the outfit.
const Outfit = ({ handleSubmmit, layersTypes }) => {
    const [layers, setLayers] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState([]);


    const handleSave = async (event) => {
        event.preventDefault();
        const clothes = [];
        for (let i = 0; i < layers.length; i++) {
            clothes.push(layers[i][carouselIndex[i]]);
        }
        handleSubmmit(clothes);
    };

    useEffect(() => {
        const getLayers = async () => {
            try {
                const layers = [];
                const carouselIndex = [];
                for (let i = 0; i < layersTypes.length; i++) {
                    layers.push([]);
                    carouselIndex.push(0);
                    const answer = await apiClient.get(`/clothing/byType/${layersTypes[i]}`);
                    layers[i] = answer.data;
                }
                setLayers(layers);
                setCarouselIndex(carouselIndex);
            } catch (e) {
                console.log(e);
            }
        };
        getLayers();
    }, [layersTypes]);

    return (
        <div className='row col-10 offset-1'>
            {layers.map((layer, index) => (
                <Carousel key={index} clothes={layer} type={layersTypes[index]}
                    handleChange={(clohingIndex) => {
                        carouselIndex[index] = clohingIndex;
                    }} />
            ))}
            <Button onClick={handleSave} className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>
        </div>
    );
}

export default Outfit;