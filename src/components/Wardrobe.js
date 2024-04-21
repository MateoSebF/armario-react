import React, { useState } from 'react';
import NavBar from './secondary/NavBar';
import Modal from '../secundaryWardrobe/modal';
import ProductListing from '../secundaryWardrobe/productListing';

const Wardrobe = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const products = [
    { id: 1, name: 'Product 1', price: 100, image: 'url1' },
    { id: 2, name: 'Product 2', price: 200, image: 'url2' },
    { id: 3, name: 'Product 3', price: 300, image: 'url3' },
    { id: 4, name: 'Product 4', price: 400, image: 'url4' },
    { id: 5, name: 'Product 5', price: 500, image: 'url5' },
    { id: 6, name: 'Product 6', price: 600, image: 'url6' },    
    { id: 7, name: 'Product 7', price: 700, image: 'url7' },
    { id: 8, name: 'Product 8', price: 800, image: 'url8' },
    { id: 9, name: 'Product 9', price: 900, image: 'url9' },
  ];

  const productRows = [];
  for (let i = 0; i < products.length; i += 3) {
    const row = (
      <div className="row" key={i} style={{ marginTop: i === 0 ? '20px' : '0' }}>
        {products.slice(i, i + 3).map((product) => (
          <div className="col-md-4" key={product.id}>
            <ProductListing product={product} />
          </div>
        ))}
      </div>
    );
    productRows.push(row);
  }

  return (
    <div className="col-12">
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary me-2" onClick={() => openModal('filter')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              Filter
            </button>
            <button className="btn btn-primary me-2" onClick={() => openModal('sort')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              Sort by
            </button>
            <button className="btn btn-primary" onClick={() => openModal('view')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              View
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {modalType === 'filter' && <Modal title="Filter" closeModal={closeModal}>{/* Content of the filter modal */}</Modal>}
            {modalType === 'sort' && <Modal title="Sort by" closeModal={closeModal}>{/* Content of the sort modal */}</Modal>}
            {modalType === 'view' && <Modal title="View" closeModal={closeModal}>{/* Content of the view modal */}</Modal>}
          </div>
        </div>
        {productRows}
      </div>
    </div>
  );
};

export default Wardrobe;
