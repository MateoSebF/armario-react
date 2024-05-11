import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import apiClient from '../../services/apiClient';
import Cookie from 'js-cookie';

// This component is used to show the navigation bar.
const NavBar = () => {

    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();
    const isInitialMount = useRef(true);
    const isLogged = useRef(false);
    // Change the selected link based on the current URL
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const pathname = location.pathname;
            if (pathname === '/') {
                setSelectedLink('Home');
            } else if (pathname.startsWith('/Wardrobe')) {
                setSelectedLink('Wardrobe');
            } else if (pathname.startsWith('/Calendar')) {
                setSelectedLink('Calendar');
            } else if (pathname.startsWith('/Community')) {
                setSelectedLink('Community');
            } else if (pathname.startsWith('/Profile')) {
                setSelectedLink('Profile');
            }
            const validateUser = async () => {
                await apiClient.get('user/validate')
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            isLogged.current = true;
                        }
                    })
                    .catch((error) => { 
                        console.error('Error al validar:', error);
                    });
            }
            validateUser();
        }

    }, [location.pathname]);


    const handleLogout = async () => {
        try {
            await apiClient.post('login/logout')
                .then((response) => {
                    console.log(response);
                    // Elimina la cookie de authToken
                    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    // Redirige a la página de inicio de sesión u otra página después de cerrar sesión
                    window.location.href = '/'; // Cambia '/login' por la URL a la que quieras redirigir
                });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <Navbar expand="md" className="my-navbar">
            <Container>
                <Navbar.Brand href="/">
                    <div className="navbar-brand">
                        <img src="./images/logo.png" alt="" width="55" height="55" className="d-inline-block align-text-center" />
                        ClothCraft
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="display">
                    <Nav className="ms-auto">
                        <Nav.Link className={selectedLink === 'Home' ? 'selected' : ''} href="/">Home</Nav.Link>
                        <Nav.Link className={selectedLink === 'Wardrobe' ? 'selected' : ''} href="/Wardrobe">Wardrobe</Nav.Link>
                        <Nav.Link className={selectedLink === 'Calendar' ? 'selected' : ''} href="/Calendar">Calendar</Nav.Link>
                        <Nav.Link className={selectedLink === 'Community' ? 'selected' : ''} href="/Community">Community</Nav.Link>
                        <Nav.Link className={selectedLink === 'Profile' ? 'selected' : ''} href="/Profile">Profile</Nav.Link>
                        {isLogged.current ? (
                            <button
                                type="button" className="btn-sample"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            > Cerrar Sesión </button>
                        ) : (
                            <>
                                <button
                                    type="button" className="btn-sample"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/login';
                                    }}
                                > Iniciar Sesión</button>
                                <button
                                    type="button" className="btn-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/register';
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