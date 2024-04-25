import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // Importa useLocation desde react-router-dom
import './styles/NavBar.css';
const NavBar = () => {
    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Obtiene la ruta actual de la URL y establece el enlace seleccionado
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
        <Navbar expand="md">
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;