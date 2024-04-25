import React from 'react';

const ProductListing = ({ product }) => {
product.name = "      I LIKE IT!";
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
      <div className="product-frame" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderColor: '#EBE1DB', borderWidth: '2px', padding: '15px', borderRadius: '50px', width: '600px', height: '100px', backgroundColor: '#EBE1DB' }}>
        <div className="product-details">
          <h4 style={{ margin: 0 }}>{product.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

