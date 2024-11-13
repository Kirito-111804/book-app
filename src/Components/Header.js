// src/components/Header.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';


const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="justify-content-center"> {/* Center the content */}
                <Navbar.Brand href="/" className="text-center"> {/* Center text */}
                    Book Management System
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;