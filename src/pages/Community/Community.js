import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/Navbar/NavBar';
import './Community.css'; 

const Community = () => {
  const [randomClothing, setRandomClothing] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchRandomNonLikedClothing(); // Llamar al cargar la página
  }, []);

  const fetchRandomNonLikedClothing = () => {   
    axios.get(`https://clothcraft.azurewebsites.net/clothing/randomNonLiked?userId=${userId}`)
      .then(response => {
        setRandomClothing(response.data);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.error('Error al obtener la prenda aleatoria no gustada:', error);
      });
  };

  const handleSmash = () => {
    console.log('Smashed!');
    fetchRandomNonLikedClothing(); 
  };

  const handlePass = () => {
    console.log('Passed!');
    fetchRandomNonLikedClothing(); //Impresion en consola al presionar botones
  };

  return (
    <div className="col-20">
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            {randomClothing && (
              <div>
                <div className="image-container">
                  <img src={randomClothing.image} alt="Random Clothing" />
                </div>
                <div className="button-container">
                  <button onClick={handleSmash}>Smash</button>
                  <button onClick={handlePass}>Pass</button>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="description-container">
              <p>{description}</p>
            </div>
            {/* Resto del código del componente */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;


