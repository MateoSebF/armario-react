import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const CarouselI = ({ clothes, handleChange, type }) => {

    const hat = './images/hat.png';
    const accessory = './images/accessory.png';
    const shirt = './images/shirt.png';
    const pant = './images/pant.png';
    const shoes = './images/shoes.png';

    const handleSlide = (clohingIndex) => {
        handleChange(clohingIndex);
    }

    const prevIcon = clothes.length > 1 ? <FaLongArrowAltLeft id='left-arrow' /> : null;
    const nextIcon = clothes.length > 1 ? <FaLongArrowAltRight id='right-arrow' /> : null;
    return (
        <Carousel
            prevIcon={prevIcon}
            nextIcon={nextIcon}
            interval={null}
            indicators={false}
            onSlide={handleSlide}>
            {clothes.map((clothes, clohingIndex) => (
                <Carousel.Item key={clohingIndex}>
                    {clothes.image && (
                        <img src={`data:image/jpeg;base64,${clothes.image}`} alt="" className="custom-carousel-image" />
                    )}
                </Carousel.Item>
            ))}
            <Carousel.Item>
                <a href={`/Wardrobe/FormGetClothing?type=${type}`}>
                    <img src={type === 'SHIRT' ? shirt : type === 'PANTS' ? pant : type === 'SHOES' ? shoes : type === 'HAT' ? hat : accessory}
                    alt="" className="custom-carousel-image" />
                </a>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselI;