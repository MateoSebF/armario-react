import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import NavBar from '../../components/Navbar/NavBar';
import './Community.css';

const Community = () => {
  const [mainImage, setMainImage] = useState('/images/shirt.png');
  const [secondaryImages, setSecondaryImages] = useState([
    { src: '/images/shoes.png', alt: 'Shoes' },
    { src: '/images/pant.png', alt: 'Pants' }
  ]);
  const [description, setDescription] = useState('Descripción temporal de la prenda');

  const getTypeFromImage = (image) => {
    if (image.includes('shirt')) return 'SHIRT';
    if (image.includes('shoes')) return 'SHOES';
    if (image.includes('pant')) return 'PANTS';
    return 'UNKNOWN';
  };

  const handleImageSwap = (index) => {
    const newMainImage = secondaryImages[index].src;
    const newSecondaryImages = [...secondaryImages];
    newSecondaryImages[index] = { src: mainImage, alt: 'Random Clothing' };
    setMainImage(newMainImage);
    setSecondaryImages(newSecondaryImages);
  };

  const fetchRandomNonLikedClothing = (type) => {
    apiClient.get(`/clothing/randomNonLiked/byType/${type}`, {
      headers: { 'userId': userId }
    })
    .then(response => {
      setMainImage(response.data.image);
      setDescription(response.data.description);
    })
    .catch(error => {
      console.error('Error al obtener la prenda aleatoria no gustada:', error);
    });
  };

  const handleSmash = async () => {
    const currentType = getTypeFromImage(mainImage);
    const clothingId = 'currentClothingId'; // Deberás tener acceso a la ID de la prenda actual
    const userId = 'yourUserId'; // Asegúrate de obtener el userId correctamente

    // Paso 1: Marcar la prenda actual como 'gustada'
    try {
      const likeResponse = await apiClient.post(`/likeClothing`, {
        clothingId: clothingId
      }, {
        headers: { 'userId': userId }
      });

      if (likeResponse.status === 200) {
        // Paso 2: Obtener una nueva prenda no gustada del mismo tipo
        fetchRandomNonLikedClothing(currentType);
      } else {
        console.error('Error al marcar la prenda como gustada:', likeResponse.status);
      }
    } catch (error) {
      console.error('Error al marcar la prenda como gustada:', error);
    }
  };

  const handlePass = () => {
    console.log('Passed!');
    const currentType = getTypeFromImage(mainImage);
    fetchRandomNonLikedClothing(currentType);
  };

  return (
    <div className="col-20">
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="image-container">
              <img src={mainImage} alt="Random Clothing" />
            </div>
            <div className="button-container">
              <button onClick={handleSmash}>Smash</button>
              <button onClick={handlePass}>Pass</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="description-container">
              <textarea className="description-text" readOnly value={description} />
            </div>
            <div className="secondary-button-container">
              {secondaryImages.map((image, index) => (
                <button key={index} onClick={() => handleImageSwap(index)}>
                  <img src={image.src} alt={image.alt} className="secondary-image" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;







