import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';

import { WithAuthService } from '../with-service';
import { logout } from '../../actions/auth'

import logo from './img/logo.svg'
import './header.sass'

const Header = ({AuthService, isLoggedIn, logout}) => {

    const renderLink = () => {
        const loginLink = (label, onClick) => <Link onClick={onClick} to="/sign-in">{label}</Link>

        if(isLoggedIn){
            return loginLink("Log out", () =>{
                AuthService.logout();
                logout();
            });
        }else{
            return loginLink("Log in");
        }
    }

    return(
        <header className="header">
            <Container>
                <Row className="align-items-center">
                    <Col className="col-auto d-flex justify-content-center">
                        <Link className="header__logo" to="/"><img src={logo} alt="logo" /></Link>
                    </Col>
                    <Col className="offset-1 offset-lg-2">
                        <nav className="header-nav">
                        {isLoggedIn ? 
                            <HashLink smooth to="/rooms">Split</HashLink> :
                            <HashLink smooth to="/sign-in">Split</HashLink>
                        }
                            <HashLink smooth to="/#about">About</HashLink>
                            <HashLink smooth to="/#how-to-use">How to use</HashLink>
                            {renderLink()}
                        </nav>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};



const mapStateToProps = ({auth: {isLoggedIn}}) => {
    return{
        isLoggedIn
    }
}

const mapDispatchToProps = {
    logout
}

export default WithAuthService()(connect(mapStateToProps, mapDispatchToProps)(Header));