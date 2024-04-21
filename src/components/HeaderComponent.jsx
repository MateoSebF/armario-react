import React from 'react';

const HeaderComponent = () => {
  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
      <header>
        <nav className="navbar navbar-dark" style={{ backgroundColor: '#f0f0f0' }}>
          <a 
            className="navbar-brand" 
            href="https://www.javaguides.net" 
            style={{ fontSize: '32px', color: '#000' }}
          >
            ClothCraft
          </a>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;

