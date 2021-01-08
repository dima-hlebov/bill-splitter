import React from 'react';
import { Container, Row} from 'reactstrap';


import logo from './img/logo-shorted.svg'
import './footer.sass'

const Footer = () => {
    return(
        <footer className="footer">
            <Container>
                <Row className="justify-content-center justify-content-md-end align-items-center">
                    <a className="footer__logo" href="/"><img src={logo} alt="logo" /></a>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;