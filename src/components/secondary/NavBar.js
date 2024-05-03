import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './styles/NavBar.css';

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

    return (
        <Navbar expand="md" className="my-navbar">
            <Container>
                <Navbar.Brand href="/">
                    <div>
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
