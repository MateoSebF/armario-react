import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const CarouselI = ({ clothes, handleChange}) => {

    const handleSlide = (clohingIndex) => {
        handleChange(clohingIndex);
    }

    return (
        <Carousel
            prevIcon={<FaLongArrowAltLeft id='left-arrow'/>}
            nextIcon={<FaLongArrowAltRight id='right-arrow'/>}
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
        </Carousel>
    );
}

export default CarouselI;