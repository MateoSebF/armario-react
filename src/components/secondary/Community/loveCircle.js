import React from 'react';

const ProductListing = ({ product }) => {
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
      <div className="product-frame" style={{ borderStyle: 'dashed', borderColor: '#2A2829', borderWidth: '0px', padding: '15px', borderRadius: '50%', width: '150px', height: '150px' , backgroundColor: '#CC7F36' }}>
        <div className="product-image" style={{ marginBottom: '10px' }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
        </div>
        <div className="product-details">
          <h4>{product.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;



