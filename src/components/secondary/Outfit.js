import React from 'react';
import Carousel from './CarouselI';
import Button from 'react-bootstrap/Button';
import './styles/Outfit.css';

const Outfit = () => {
    const shirts = ['./images/1.png', './images/2.png', './images/3.png'];
    const pants = ['./images/4.png', './images/5.png', './images/6.png'];
    const shoes = ['./images/7.png', './images/8.png', './images/9.png'];
    return (
        <div className='row full-width-div'>
            <Carousel images={shirts}/>
            <Carousel images={pants}/>
            <Carousel images={shoes}/>
            <Button className='col-4 offset-4 mt-3 circular-button'>SAVE</Button>   
        </div>
        
    );
}

export default Outfit;
