import React from 'react';
import './SecondaryCloth.css';
const ProductListing = ({ product }) => {
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
      <div className="product-frame product-frame-des">
        <div className="product-image" style={{ marginBottom: '10px', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div className="product-details">
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
