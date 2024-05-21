import React from 'react';

const ProductListing = ({ product }) => {
  const isMobile = window.innerWidth <= 768; // Establece el ancho máximo para dispositivos móviles

  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
        {!isMobile && ( // Verifica si no es un dispositivo móvil para mostrar los detalles
                <div className="product-frame" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderColor: '#EBE1DB', borderWidth: '2px', padding: '15px', borderRadius: '50px', width: '600px', height: '100px', backgroundColor: '#EBE1DB' }}>

          <div className="product-details">
            <h4 style={{ margin: 0 }}>I LIKE IT!</h4>
            </div>
          </div>
        )}

    </div>
  );
};

export default ProductListing;
