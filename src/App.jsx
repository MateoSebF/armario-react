import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importa Routes en lugar de Switch
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './styles/App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
