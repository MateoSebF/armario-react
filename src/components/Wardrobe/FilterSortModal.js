import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FilterSortModal = ({ show, handleClose, filters, setFilters, orderBy, setOrderBy, orderDirection, setOrderDirection, applyFilters, applySorting, filterOptions }) => {
  const { t } = useTranslation();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setOrderDirection(e.target.value);
  };

  const handleApply = () => {
    applyFilters();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Filter and Sort')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filterColor">
            <Form.Label>{t('Color')}</Form.Label>
            <Form.Control 
              as="select" 
              name="color" 
              value={filters.color} 
              onChange={handleFilterChange}
            >
              <option value="">{t('Select Color')}</option>
              {filterOptions.colors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filterSize">
            <Form.Label>{t('Size')}</Form.Label>
            <Form.Control 
              as="select" 
              name="size" 
              value={filters.size} 
              onChange={handleFilterChange}
            >
              <option value="">{t('Select Size')}</option>
              {filterOptions.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filterType">
            <Form.Label>{t('Type')}</Form.Label>
            <Form.Control 
              as="select" 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
            >
              <option value="">{t('Select Type')}</option>
              {filterOptions.types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sortOrderBy">
            <Form.Label>{t('Sort By')}</Form.Label>
            <Form.Control 
              as="select" 
              value={orderBy} 
              onChange={handleSortChange}
            >
              <option value="name">{t('Name')}</option>
              <option value="color">{t('Color')}</option>
              <option value="size">{t('Size')}</option>
              <option value="type">{t('Type')}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sortDirection">
            <Form.Label>{t('Sort Direction')}</Form.Label>
            <Form.Control 
              as="select" 
              value={orderDirection} 
              onChange={handleSortDirectionChange}
            >
              <option value="asc">{t('Ascending')}</option>
              <option value="desc">{t('Descending')}</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
        <Button variant="primary" onClick={handleApply}>
          {t('Apply')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterSortModal;