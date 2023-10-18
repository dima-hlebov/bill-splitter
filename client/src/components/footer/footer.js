import React from 'react';
import { Container, Row } from 'reactstrap';


import logo from './img/logo-shorted.svg'
import './footer.sass'

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="justify-content-between justify-content-md-between align-items-center">
                    <p className="mb-0 text-white">© 2023 All rights reserved</p>
                    <a className="footer__logo" href="/"><img src={logo} alt="logo" /></a>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;