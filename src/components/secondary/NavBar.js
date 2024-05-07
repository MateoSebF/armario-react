import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './styles/NavBar.css';
import Cookies from 'js-cookie';
import axios from 'axios';


/*function handleClick() {
    console.log('Link clicked!');
  }*/

const NavBar = () => {
    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/') {
            setSelectedLink('Home');
        } else if (pathname === '/Wardrobe') {
            setSelectedLink('Wardrobe');
        } else if (pathname === '/Calendar') {
            setSelectedLink('Calendar');
        } else if (pathname === '/Community') {
            setSelectedLink('Community');
        } else if (pathname === '/Profile') {
            setSelectedLink('Profile');
        }
    }, [location.pathname]);

    const authToken = Cookies.get('authToken');

    const handleLogout = async () => {
        try {
            
            // Envía una solicitud POST a la URL de cierre de sesión con los encabezados configurados
            const response = await axios.post('http://localhost:8080/login/logout', {
                'Cookie': `${authToken}`
            });
            
            // Elimina la cookie de authToken
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            
            // Redirige a la página de inicio de sesión u otra página después de cerrar sesión
            window.location.href = '/'; // Cambia '/login' por la URL a la que quieras redirigir
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la solicitud
            console.error('Error al cerrar sesión:', error);
        }
    };
    
    

    return (
        <Navbar expand="md" className="my-navbar">
            <Container>
                <Navbar.Brand href="/">
                    <a className="navbar-brand" href="/">
                        <img src="./images/logo.png" alt="" width="55" height="55" className="d-inline-block align-text-center"/>
                        ClothCraft
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="display">
                    <Nav className="ms-auto">
                        <Nav.Link className={selectedLink === 'Home' ? 'selected' : ''} href="/">Home</Nav.Link>
                        <Nav.Link className={selectedLink === 'Wardrobe' ? 'selected' : ''} href="/Wardrobe">Wardrobe</Nav.Link>
                        <Nav.Link className={selectedLink === 'Calendar' ? 'selected' : ''} href="/Calendar">Calendar</Nav.Link>
                        <Nav.Link className={selectedLink === 'Community' ? 'selected' : ''} href="/Community">Community</Nav.Link>
                        <Nav.Link className={selectedLink === 'Profile' ? 'selected' : ''} href="/Profile">Profile</Nav.Link>
                        {authToken && authToken !== '0' ? (
                        <button
                        type="button" class="btn-sample"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    > Cerrar Sesión </button>
                    ) : (
                        <>
                            <button
                            type="button" class="btn-sample"
                            onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/login';
                            }}
                        > Iniciar Sesión</button>
                        <button
                            type="button" class="btn-2"
                            onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/register';
                            }}
                        > Registrate</button>
                        </>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;