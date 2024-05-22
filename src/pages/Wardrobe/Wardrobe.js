import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Modal from '../../components/Wardrobe/modal';
import ProductListing from '../../components/Wardrobe/productListing';
import apiClient from '../../services/apiClient';
import { FiPlus } from "react-icons/fi";
import './Wardrobe.css';

// This is the main page of the wardrobe. It will display the products in the wardrobe and allow the user to filter, sort and view the products.
const Wardrobe = () => {

  const [modalType, setModalType] = useState(null);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('clothings');

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Fetch the products from the API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view');
        var answer;
        if (view === 'likeds'){
          answer = await apiClient.get('/wardrobe/likedClothes');
          setView('likeds');
        }
        else{
          answer = await apiClient.get('/wardrobe/clothings');
          setView('clothings');
        }
          
        setProducts(answer.data);
      } catch (e) {
        console.log(e);
      }
    };

    getProducts();
  }, []);

  const changeView = () => {
    if (view === 'likeds'){
      window.location.href = '/Wardrobe?view=clothings';
    }
    else{
      window.location.href = '/Wardrobe?view=likeds';
    }
  }
  // Display the products in rows of 3
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
        <button className="btn btn-primary mb-2" onClick={() => changeView()} style={{ backgroundColor: '#934A21', borderColor: '#934A21' }}>
          {view === 'likeds' ? 'View my clothes' : 'View liked clothes'}
        </button>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary me-2" onClick={() => openModal('filter')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              Filter
            </button>
            <button className="btn btn-primary me-2" onClick={() => openModal('sort')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              Sort by
            </button>
            <button className="btn btn-primary me-4" onClick={() => openModal('view')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              View
            </button>
            <a href='/Wardrobe/FormGetClothing' className="fab"><FiPlus size={35} /></a>
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
