import React from 'react';
import NavBar from '../../components/Navbar/NavBar';
import PrincipalCloth from '../../components/Community/principalCloth';
import Like from '../../components/Community/like';
import Dislike from '../../components/Community/dislike';
import SecundaryCloth from '../../components/Community/secundaryCloth';
import ThirdCloth from '../../components/Community/thirdCloth';
import Love from '../../components/Community/loveCircle';
import Hand from '../../components/Community/handCircle';

const Profile = () => {
  const product = { id: 1, name: '', image: './images/shirt.png' };
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
              <p>INSERTAR LA DESCRIPCIÓN DE LA ROPA</p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet mauris vel libero dignissim, eget rutrum enim tincidunt. Proin tincidunt metus lectus,
              vestibulum molestie odio congue sollicitudin. Vestibulum a enim ex. Pellentesque hendrerit euismod lectus, vitae ultricies elit suscipit nec. Nullam at dui magna.
              Suspendisse est diam, faucibus vel rhoncus facilisis, iaculis ac nisi. Mauris quis ipsum risus. Aenean a tellus ac mi faucibus varius non nec urna. Nullam eu velit
              in leo bibendum condimentum. Duis rhoncus nisl ac est pretium, vitae maximus ligula aliquam. Ut accumsan pretium dui, vitae mollis felis euismod in. Etiam mauris erat,
              condimentum non porttitor eget, pellentesque ac ligula. Sed pulvinar lorem ipsum, eu fringilla arcu ornare et. Donec a sem ante.
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
