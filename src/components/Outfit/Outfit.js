import React, { useState, useEffect } from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './Outfit.css';
import apiClient from '../../services/apiClient';
import { ThreeDots } from 'react-loader-spinner';

// This component is used to show the outfit.
const Outfit = ({ handleSubmmit, layersTypes }) => {
    const [layers, setLayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [carouselIndex, setCarouselIndex] = useState([]);
    const [allValid, setAllValid] = useState(true);

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
                if (layersTypes.length > 0) setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        getLayers();
    }, [layersTypes]);

    return (
        <div className='row col-10 offset-1'>
            {loading ? (
                <div className="loader mt-5">
                    <ThreeDots
                        color="#86654B"
                        height={100}
                        width={100}
                    />
                </div>
            ) :
                (
                    <div>
                        {layers.map((layer, index) => (
                            <Carousel key={index} clothes={layer} type={layersTypes[index]}
                                handleChange={(clohingIndex) => {
                                    if (clohingIndex === layer.length) clohingIndex = -1;
                                    carouselIndex[index] = clohingIndex;
                                    for (let i = 0; i < carouselIndex.length; i++) {
                                        if (carouselIndex[i] === -1) {
                                            setAllValid(false);
                                            return;
                                        }
                                    }
                                    setAllValid(true);
                                }} />
                        ))}
                        {allValid ?
                            <Button onClick={handleSave} className='col-4 offset-4 mt-3 circular-button' style={{ height: '6vh' }}>SAVE</Button>
                            :
                            <></>
                        }
                    </div>
                )}
        </div>
    );
}

export default Outfit;