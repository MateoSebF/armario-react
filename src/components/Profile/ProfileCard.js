import React, { useState, useEffect } from 'react';
import './ProfileCard.css';
import apiClient from '../../services/apiClient';

const ProfileCard = ({ profileData }) => {
  const { name, username, numItems, numOutfits,profileImage } = profileData;
  const [newImage, setNewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(profileImage);
  
  useEffect(() => {
    const handleImageChange = async (imageData) => {
      try {
        let base64Image = imageData;
        if (imageData instanceof File) {
          base64Image = await convertToBase64(imageData);
        }
    
        // Eliminar prefijo no deseado (data URI)
        base64Image = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    
        // Limpiar el base64
        base64Image = cleanBase64(base64Image);

        const response = await apiClient.patch('/user/photo', { photoProfile: base64Image });
    
        if (response.status === 200) {
          // Actualiza la imagen en el estado local
          setUploadedImage(base64Image);
        }
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    };
    setUploadedImage(profileImage);
    // Llama a handleImageChange cuando newImage cambie
    if (newImage) {
      handleImageChange(newImage);
    }
  }, [profileImage, newImage]);

  const cleanBase64 = (base64String) => {
    return base64String.replace(/[^A-Za-z0-9+/]/g, '');
  };
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setNewImage(file);
  };

  return (
    <div className="profile-card">
      <div className="profile-image-container">
        <label htmlFor="file-upload" className="profile-image-edit-button">
          <i className="fa fa-pencil"></i>
          <input id="file-upload" type="file" accept="image/*" onChange={handleInputChange} />
        </label>
        <img
          src={newImage ? URL.createObjectURL(newImage) : `data:image/png;base64,${uploadedImage}`}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="profile-info">
        <h2>{name}</h2>
        <p>{username}</p>
        <p>Clothes: {numItems}</p>
        <p>Outfits: {numOutfits}</p>
      </div>
    </div>
  );
};

export default ProfileCard;