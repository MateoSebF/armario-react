import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './styles/Carousel.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
const CarouselI = ({ images }) => {
    return (
        <Carousel
            prevIcon={<FaLongArrowAltLeft id='left-arrow'/>}
            nextIcon={<FaLongArrowAltRight id='right-arrow'/>}
            interval={null}
            indicators={false}
        >
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img src={image} alt="" className="custom-carousel-image" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselI;
