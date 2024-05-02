import React from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './styles/Outfit.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Outfit = ({makeOutfit}) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [layers, setLayers] = useState([[],[],[]]);
    useEffect(() => {
        const getLayers = async () => {
            try {
                const layers = [];
                var answer = await axios.get(`${apiUrl}clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/SHIRT`);
                layers[0] = answer.data;
                answer = await axios.get(`${apiUrl}clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/PANTS`);
                layers[1] = answer.data;
                answer = await axios.get(`${apiUrl}clothing/byType/f64b3285-693b-48b3-8fc6-012854d2a07c/SHOES`);
                layers[2] = answer.data;
                setLayers(layers);
            } catch (e) {
                console.log(e);
            }
        };
        if (makeOutfit)getLayers();
    }, [apiUrl,makeOutfit]);

    return (
        <div className='row col-10 offset-1'>
            <Carousel clothes={layers[0]}/>
            <Carousel clothes={layers[1]}/>
            <Carousel clothes={layers[2]}/>
            <Button className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>   
        </div>
        
    );
}

export default Outfit;
