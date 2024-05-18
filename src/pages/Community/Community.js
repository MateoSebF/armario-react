import React, { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import NavBar from '../../components/Navbar/NavBar';
import PrincipalCloth from '../../components/Community/principalCloth';
import Like from '../../components/Community/like';
import Dislike from '../../components/Community/dislike';
import SecundaryCloth from '../../components/Community/secundaryCloth';
import ThirdCloth from '../../components/Community/thirdCloth';
import Love from '../../components/Community/loveCircle';
import Hand from '../../components/Community/handCircle';

const Profile = () => {

  const [product, setProduct] = useState({ name: '', image: './images/shirt.png' });
  useEffect(() => {
    const getPrincipalCloth = async () => {
      try {
        const answer = await apiClient.get('/clothing/randomNonLiked/byType/SHIRT');
        setProduct(answer.data);
        console.log(answer.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPrincipalCloth();
  },[]);
  const heart = { name: '', image: './images/heart.png' }
  const hand = { name: '', image: './images/hand.png' }
  const pant = { name: '', image: './images/pant.png' }
  const shoes = { name: '', image: './images/shoes.png' }

  return (
    <div className="col-20">
      <NavBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
              <PrincipalCloth product={product} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '24px', padding: '80px', border: '3px solid #ccc', borderRadius: '30px', overflowY: 'scroll', maxHeight: '300px', scrollbarColor: '#A78262 #EBE1DB' }}>
              <p>Descripción del producto</p>
              <p>Name:{product.name}</p>
              <p>Color:{product.color}</p>
              <p>Size:{product.size}</p>
              <p>Type:{product.type}</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12" style={{ height: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', zIndex: 2 }}>
                <Love product={heart} style={{ color: '#A78262' }} />
              </div>
              <Like product={product} style={{ color: '#A78262', marginLeft: '20px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: '60px' }}>
              <div style={{ position: 'absolute', left: '0', zIndex: 2 }}>
                <Hand product={hand} style={{ color: '#A78262' }} />
              </div>
              <Dislike product={product} style={{ color: '#A78262', marginLeft: '50px' }} />
            </div>
            <div style={{ display: 'flex', marginTop: '100px' }}>
              <SecundaryCloth product={pant} />
              <div style={{ marginLeft: '80px' }}>
                <ThirdCloth product={shoes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
