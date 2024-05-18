import React, { useEffect, useState, useRef } from 'react';
import apiClient from '../../services/apiClient';
import NavBar from '../../components/Navbar/NavBar';
import './Community.css';

const Community = () => {
  const isInitialMount = useRef(true);

  const [mainFocus, setMainFocus] = useState({image:'/images/shirt.png', name:'Example shirt', color:'White', size:'M', type:'SHIRT'});
  const [secondaryFocus, setSecondaryFocus] = useState([
    { image: '/images/shoes.png', name: 'Example shoes', color: 'Black', size: '10', type: 'SHOES'},
    { image: '/images/pant.png', name: 'Example pants', color: 'Blue', size: '32', type: 'PANTS'}
  ]);

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
      }
      getInitialData();
    }

  }, []);


  const [description, setDescription] = useState('Descripción temporal de la prenda');

  const getTypeFromFocus = (focus) => {
    return focus.type;
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

  const fetchRandomNonLikedClothing = (type) => {
    apiClient.get(`/clothing/randomNonLiked/byType/${type}`)
      .then(response => {
        setMainFocus(response.data);
        setDescription(`Clothing description: 
          \nName: ${response.data.name} 
          \nColor: ${response.data.color}
          \nSize: ${response.data.size}
          \nType: ${response.data.type}`);
      })
      .catch(error => {
        console.error('Error al obtener la prenda aleatoria no gustada:', error);
      });
  };

  const handleSmash = async () => {
    const currentType = getTypeFromFocus(mainFocus);

    // Paso 1: Marcar la prenda actual como 'gustada'
    try {
      const likeResponse = await apiClient.post(`/clothing/likeClothing`,mainFocus);

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
    const currentType = getTypeFromFocus(mainFocus);
    fetchRandomNonLikedClothing(currentType);
  };

  return (
    <div className="col-20">
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="image-container">
              <img src={`data:image/jpeg;base64,${mainFocus.image}`} alt="Random Clothing" />
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
              {secondaryFocus.map((focus, index) => (
                <button key={index} onClick={() => handleFocusSwap(index)}>
                  <img src={`data:image/jpeg;base64,${focus.image}`} alt={index} className="secondary-image" />
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







