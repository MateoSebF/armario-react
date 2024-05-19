import React from 'react';

const ProductListing = ({ product }) => {
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
      <div className="product-frame" style={{ borderStyle: 'dashed', borderColor: '#2A2829', borderWidth: '0px', padding: '15px', borderRadius: '20px', width: '200px', height: '200px', backgroundColor: '#A4826D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
