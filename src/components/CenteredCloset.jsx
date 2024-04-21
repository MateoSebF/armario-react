import React from 'react';
import '../styles/CenteredCloset.css'; 
import CarouselShirt from './Carousels/CarouselShirt';
import CarouselPants from './Carousels/CarouselPants';

const CenteredCloset = () => {
  return (
    <div className="row col-4 offset-4 centered-closet text-center">
      <h2>Make your outfit</h2>
      <div className="col-6 offset-3 mt-3">
        <CarouselShirt/>
      </div>
      <div className="col-6 offset-3 mt-3 mb-3">
        <CarouselPants/>
      </div>
    </div>
  );
};

export default CenteredCloset;
