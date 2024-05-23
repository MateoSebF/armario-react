import React from 'react';
import { Button } from 'react-bootstrap';
import apiClient from '../../services/apiClient';
import { useTranslation } from 'react-i18next';
import '../../i18n';


// This component is used to show the product listing.
const ProductListing = ({ product }) => {
  const { t } = useTranslation();

  const deleteProduct = async () => {
    try {
      await apiClient.delete(`/clothing/${product.id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="product-listing" style={{ marginBottom: '20px' }}>
      <div className="product-frame" style={{ border: '4px solid #A4826D', padding: '15px', borderRadius: '8px' }}>
        <div className="product-image" style={{ marginBottom: '10px' }}>
          {product.image && (
            <img 
              src={`data:image/jpeg;base64,${product.image}`}
              alt={product.name} 
              style={{ maxWidth: '100%', maxHeight: '100%' }} 
            />
          )}
        </div>
        <div className="product-details">
          <h4>{product.name}</h4>
        </div>
        <Button variant="danger" onClick={deleteProduct}>{t('Remove')}</Button> {/* Traducir "Remove" */}
      </div>
    </div>
  );
};

export default ProductListing;
