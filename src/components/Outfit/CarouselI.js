import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { SlArrowLeft , SlArrowRight} from "react-icons/sl";

const CarouselI = ({ clothes, handleChange, type }) => {

    const hat = './images/hat.png';
    const accessory = './images/accessory.png';
    const shirt = './images/shirt.png';
    const pant = './images/pant.png';
    const shoes = './images/shoes.png';

    const handleSlide = (clohingIndex) => {
        handleChange(clohingIndex);
    }

    const prevIcon = clothes.length > 0 ? <SlArrowLeft id='left-arrow' /> : null;
    const nextIcon = clothes.length > 0 ? <SlArrowRight id='right-arrow' /> : null;
    return (
        <Carousel className='custom-carousel'
            prevIcon={prevIcon}
            nextIcon={nextIcon}
            interval={null}
            indicators={false}
            onSlide={handleSlide}>
            {clothes.map((clothes, clohingIndex) => (
                <Carousel.Item key={clohingIndex} >
                    {clothes.image && (
                        <img src={`data:image/jpeg;base64,${clothes.image}`} alt="" className={`custom-carousel-image ${type}`}/>
                    )}
                </Carousel.Item>
            ))}
            <Carousel.Item key={-1}>
                <a href={`/Wardrobe/FormGetClothing?type=${type}`}>
                    <img src={type === 'SHIRT' ? shirt : type === 'PANTS' ? pant : type === 'SHOES' ? shoes : type === 'HAT' ? hat : accessory}
                    alt="" className={`custom-carousel-image ${type}`} />
                </a>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselI;