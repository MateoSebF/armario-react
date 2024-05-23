import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar/NavBar';
import ProductListing from '../../components/Wardrobe/productListing';
import FilterSortModal from '../../components/Wardrobe/FilterSortModal';
import apiClient from '../../services/apiClient';
import { FiPlus } from "react-icons/fi";
import './Wardrobe.css';
import '../../i18n';
import { useTranslation } from 'react-i18next';

// This is the main page of the wardrobe. It will display the products in the wardrobe and allow the user to filter, sort and view the products.
const Wardrobe = () => {
  const [modalType, setModalType] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [view, setView] = useState('clothings');
  const [filters, setFilters] = useState({ color: '', size: '', type: '' });
  const [orderBy, setOrderBy] = useState('name');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [filterOptions, setFilterOptions] = useState({ colors: [], sizes: [], types: [] });
  const { t } = useTranslation();

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Fetch the products from the API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view');
        let answer;
        if (view === 'likeds') {
          answer = await apiClient.get('/wardrobe/likedClothes');
          setView('likeds');
        } else {
          answer = await apiClient.get('/wardrobe/clothings');
          setView('clothings');
        }
        setProducts(answer.data);
        setFilteredProducts(answer.data);

        // Extract filter options
        const colors = [...new Set(answer.data.map(product => product.color))];
        const sizes = [...new Set(answer.data.map(product => product.size))];
        const types = [...new Set(answer.data.map(product => product.type))];
        setFilterOptions({ colors, sizes, types });
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, []);

  const changeView = () => {
    if (view === 'likeds') {
      window.location.href = '/Wardrobe?view=clothings';
    } else {
      window.location.href = '/Wardrobe?view=likeds';
    }
  }

  const applyFilters = () => {
    let filtered = products;
    if (filters.color) {
      filtered = filtered.filter(product => product.color === filters.color);
    }
    if (filters.size) {
      filtered = filtered.filter(product => product.size === filters.size);
    }
    if (filters.type) {
      filtered = filtered.filter(product => product.type === filters.type);
    }
    setFilteredProducts(filtered);
  };

  const applySorting = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return orderDirection === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return orderDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredProducts(sorted);
  };

  // Display the products in rows of 3
  const productRows = [];
  for (let i = 0; i < filteredProducts.length; i += 3) {
    const row = (
      <div className="row" key={i} style={{ marginTop: i === 0 ? '20px' : '0' }}>
        {filteredProducts.slice(i, i + 3).map((product) => (
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
        <button className="btn btn-primary mb-2" onClick={changeView} style={{ backgroundColor: '#934A21', borderColor: '#934A21' }}>
          {t(view === 'likeds' ? 'View my clothes' : 'View liked clothes')}
        </button>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary me-2" onClick={() => openModal('filter')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              {t('Filter')}
            </button>
            <button className="btn btn-primary me-2" onClick={() => openModal('sort')} style={{ backgroundColor: '#A4826D', borderColor: '#A4826D' }}>
              {t('Sort by')}
            </button>            
          </div>
        </div>
        {productRows}
        <a href='/Wardrobe/FormGetClothing' className="fab">
          <FiPlus />
        </a>
      </div>
      <FilterSortModal
        show={modalType !== null}
        handleClose={closeModal}
        filters={filters}
        setFilters={setFilters}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
        applyFilters={applyFilters}
        applySorting={applySorting}
        filterOptions={filterOptions}
      />
    </div>
  );
};

export default Wardrobe;


