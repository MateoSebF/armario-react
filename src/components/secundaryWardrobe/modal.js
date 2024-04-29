import React from 'react';

const Modal = ({ title, children, closeModal }) => (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', margin: '0' }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content" style={{ backgroundColor: '#D9D7D7', color: '#2A2829' }}>
        <div className="modal-header d-flex justify-content-between">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
