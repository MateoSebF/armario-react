import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './styles/Carousel.css';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const CarouselI = ({ clothes, handleChange, makeOutfit}) => {

    const handleSlide = (clohingIndex) => {
        handleChange(clohingIndex);
    }

    return (
        <Carousel
            prevIcon={<FaLongArrowAltLeft id='left-arrow'/>}
            nextIcon={<FaLongArrowAltRight id='right-arrow'/>}
            interval={null}
            indicators={false}
            controls={makeOutfit}
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