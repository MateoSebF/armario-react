import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import PrincipalCloth from '../../components/secondary/Community/principalCloth';
import Like from '../../components/secondary/Community/like';
import Dislike from '../../components/secondary/Community/dislike';
import SecundaryCloth from '../../components/secondary/Community/secundaryCloth';
import Love from '../../components/secondary/Community/loveCircle';
import Hand from '../../components/secondary/Community/handCircle';
import './Community.css'; // Estilos CSS del componente Community
import apiClient from '../../services/apiClient';

const Community = () => {
  const isInitialMount = useRef(true);

  const [mainFocus, setMainFocus] = useState({ image: '/images/shirt.png', name: 'Example shirt', color: 'White', size: 'M', type: 'SHIRT' });
  const [secondaryFocus, setSecondaryFocus] = useState([
    { image: '/images/shoes.png', name: 'Example shoes', color: 'Black', size: '10', type: 'SHOES' },
    { image: '/images/pant.png', name: 'Example pants', color: 'Blue', size: '32', type: 'PANTS' }
  ]);
  const [description, setDescription] = useState('Descripción temporal de la prenda');

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const getInitialData = async () => {
        try {
          const response = await apiClient.get('/clothing/randomNonLiked/byType/SHIRT');
          setMainFocus(response.data);
          setDescription(`Clothing description: 
            \nName: ${response.data.name} 
            \nColor: ${response.data.color}
            \nSize: ${response.data.size}
            \nType: ${response.data.type}`);
          
          const responseShoes = await apiClient.get('/clothing/randomNonLiked/byType/SHOES');
          const responsePants = await apiClient.get('/clothing/randomNonLiked/byType/PANTS');
          setSecondaryFocus([responseShoes.data, responsePants.data]);
        } catch (error) {
          console.error('Error al obtener la prenda aleatoria no gustada:', error);
        }
      };
      getInitialData();
    }
  }, []);

  const getTypeFromFocus = (focus) => {
    return focus.type;
  };

  const fetchRandomNonLikedClothing = (type) => {
    apiClient.get(`/clothing/randomNonLiked/byType/${type}`)
      .then(response => {
        if (response.status === 204) {
          console.log('La solicitud se ha procesado con éxito, pero no hay contenido para devolver.');
        } else if (typeof response.data === 'object' && response.data !== null) {
          setMainFocus(response.data);
          setDescription(`Clothing description: 
            \nName: ${response.data.name} 
            \nColor: ${response.data.color}
            \nSize: ${response.data.size}
            \nType: ${response.data.type}`);
        } else {
          console.error('Invalid response data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener la prenda aleatoria no gustada:', error);
      });
  };

  const handleLike = async () => {
    const currentType = getTypeFromFocus(mainFocus);

    try {
      const likeResponse = await apiClient.post(`/clothing/likeClothing`, mainFocus);

      if (likeResponse.status === 200) {
        console.log(description);
        fetchRandomNonLikedClothing(currentType);
      } else if (likeResponse.status === 204) {
        console.log('No content found after like action');
      } else {
        console.error('Error al marcar la prenda como gustada:', likeResponse.status);
      }
    } catch (error) {
      console.error('Error al marcar la prenda como gustada:', error);
    }
  };

  const handleDislike = () => {
    const currentType = getTypeFromFocus(mainFocus);
    fetchRandomNonLikedClothing(currentType);
  };

  const handleFocusSwap = (index) => {
    const newMainFocus = secondaryFocus[index];
    const newSecondaryFocus = [...secondaryFocus];
    newSecondaryFocus[index] = mainFocus;
    setMainFocus(newMainFocus);
    setDescription(`Clothing description:
      \nName: ${newMainFocus.name} 
      \nColor: ${newMainFocus.color}
      \nSize: ${newMainFocus.size}
      \nType: ${newMainFocus.type}`);
    setSecondaryFocus(newSecondaryFocus);
  };

  return (
    <div className="col-20">
      <NavBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`data:image/jpeg;base64,${mainFocus.image}`} alt="Prenda" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              <PrincipalCloth product={mainFocus} />
            </div>
          </div>
          <div className="col-lg-6 col-md-12" style={{ height: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '50%', marginBottom: '40px' }}>
              <button onClick={handleLike} style={{ all: 'unset', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                  <Love product={{ name: '', image: './images/heart.png' }} style={{ color: '#A78262' }} />
                </div>
                <Like product={mainFocus} style={{ color: '#A78262', marginLeft: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '50%', marginTop: '40px' }}>
              <button onClick={handleDislike} style={{ all: 'unset', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                  <Hand product={{ name: '', image: './images/hand.png' }} style={{ color: '#A78262' }} />
                </div>
                <Dislike product={mainFocus} style={{ color: '#A78262', marginLeft: '50px' }} />
              </button>
            </div>
            <div className="secondary-button-container" style={{ display: 'flex', gap: '20px', marginTop: '100px' }}>
              {secondaryFocus.map((focus, index) => (
                <button key={index} onClick={() => handleFocusSwap(index)} style={{ all: 'unset', cursor: 'pointer' }}>
                  <SecundaryCloth product={focus} />
                </button>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
