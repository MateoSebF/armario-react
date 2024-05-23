import React from 'react';

const productListing = ({ product }) => {
  console.log('Product:', product);
  console.log('Product name:', product.name);
  return (
    <div className="product-listing" style={{ marginBottom: '30px' }}>
      <div className="product-frame" style={{borderStyle: 'solid', borderColor: '#EBE1DB', borderWidth: '2px', padding: '15px', borderRadius: '50px', maxWidth: '600px', backgroundColor: '#EBE1DB', marginTop:'10px' }}>
        <div className="product-details p-3">
          <h4 style={{ margin: 0 }}>Clothing description:  </h4>
          <h4 style={{ margin: 0 }}> Name: {product.name}  </h4>
          <h4 style={{ margin: 0 }}> Color: {product.color}  </h4>
          <h4 style={{ margin: 0 }}> Size: {product.size}  </h4>
          <h4 style={{ margin: 0 }}> Type: {product.type}  </h4>
        </div>
      </div>
    </div>
  );
};

export default productListing;
