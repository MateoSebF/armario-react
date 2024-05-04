import React, { useState, useEffect } from 'react';
import NavBar from './secondary/NavBar';
import Modal from './secundaryWardrobe/modal';
import ProductListing from './secundaryWardrobe/productListing';
import axios from 'axios';

const Wardrobe = () => {
  const [modalType, setModalType] = useState(null);
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const answer = await axios.get(`https://clothcraft.azurewebsites.net/user/clothings/86db7be3-be82-4f7f-9fa1-0c53db05531c`);
        setProducts(answer.data);
      } catch (e) {
        console.log(e);
      }
    };

    getProducts();
  }, [apiUrl]);

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
