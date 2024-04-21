import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/LeftComponent.css';

const LeftComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegisterSubmit = () => {
    alert(`Thank you for registering, ${name} ${lastName}, with email: ${email}`);
    setShowModal(false);
  };

  return (
    <div className="left-menu" style={{ marginTop: '60px' }}>
      <div className="menu-item">Create outfit</div>
      <div className="menu-item">Wardrobe</div>
      <div className="menu-item">Calendar</div>
      <div className="menu-item">Smash or Pass</div>
      <div className="menu-item" onClick={handleRegisterClick}>Register</div>
      <div className="menu-item">
        <Link to={"/profile"} className='profile-link'>Profile</Link>
        </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter your information:</p>
          <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegisterSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeftComponent;
