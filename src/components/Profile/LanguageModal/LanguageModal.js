import React from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import './LanguageModal.css';

const LanguageModal = ({ isOpen, onRequestClose }) => {
  const { i18n } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <button className="close-button" onClick={onRequestClose}>&times;</button>
      <h2 className="modal-header">Select Language</h2>
      <div>
        <button className="language-button" onClick={() => { i18n.changeLanguage('en'); onRequestClose(); }}>English</button>
        <button className="language-button" onClick={() => { i18n.changeLanguage('es'); onRequestClose(); }}>Español</button>
        <button className="language-button" onClick={() => { i18n.changeLanguage('ch'); onRequestClose(); }}>中国人</button>
        <button className="language-button" onClick={() => { i18n.changeLanguage('fr'); onRequestClose(); }}>France</button>
      </div>
    </Modal>
  );
};

export default LanguageModal;



