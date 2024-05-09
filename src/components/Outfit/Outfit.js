import React, { useRef } from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './Outfit.css';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

// This component is used to show the outfit.
const Outfit = ({ handleSubmmit }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [layers, setLayers] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState([]);
    const isInitialMount = useRef(true);

    const handleSave = async (event) => {
        event.preventDefault();

        const clothes = [layers[0][carouselIndex[0]],
        layers[1][carouselIndex[1]]];
        handleSubmmit(clothes);
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const getLayers = async () => {
                try {
                    const layers = [];
                    const carouselIndex = [];
                    const layersTypes = await apiClient.get('/wardrobe/layersTypes');
                    for (let i = 0; i < layersTypes.data.length; i++) {
                        layers.push([]);
                        carouselIndex.push(0);
                        const answer = await apiClient.get(`/clothing/byType/${layersTypes.data[i]}`);
                        layers[i] = answer.data;
                    }
                    console.log(layers);
                    setLayers(layers);
                    setCarouselIndex(carouselIndex);
                } catch (e) {
                    console.log(e);
                }
            };
            getLayers();
        }
    }, [apiUrl]);

    return (
        <div className='row col-10 offset-1'>
            {layers.map((layer, index) => (
                <Carousel key={index} clothes={layer}
                    handleChange={(clohingIndex) => {
                        carouselIndex[index] = clohingIndex;
                    }} />
            ))}
            <Button onClick={handleSave} className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>

        </div>


    );
}

export default Outfit;