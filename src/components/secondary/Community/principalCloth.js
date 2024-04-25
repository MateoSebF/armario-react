import React from 'react';

const ProductListing = ({ product }) => {
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>

      <div className="product-frame" style={{ borderStyle: 'dashed', borderColor: '#2A2829', borderWidth: '10px', padding: '15px', borderRadius: '100px', width: '450px', height: '450px' }}>
        <div className="product-image" style={{ marginBottom: '10px' }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <div className="product-details">

        </div>
      </div>
    </div>
  );
};

export default ProductListing;
