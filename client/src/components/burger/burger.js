import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';

import { WithAuthService } from '../with-service';
import { logout } from '../../actions/auth'
import './burger.sass'

class Burger extends Component {
    state = {
        isMenuOpen: false
    }

    handleStateChange (state) {
        this.setState({isMenuOpen: state.isMenuOpen})  
      }

    closeMenu(){
        this.setState({isMenuOpen: false});
    }

    logout(){
        this.props.AuthService.logout();
        this.props.logout();
        this.closeMenu();
    }

    renderLink(){
        const loginLink = (label, onClick) => <Link onClick={onClick} to="/sign-in">{label}</Link>
        if(this.props.isLoggedIn){
            return loginLink("Log out", () => this.logout());
        }else{
            return loginLink("Log in", () => this.closeMenu());
        }
    }

    render(){
        return(
            <Menu 
                isOpen={this.state.isMenuOpen}
                onStateChange={(state) => this.handleStateChange(state)}>
                {this.props.isLoggedIn ? 
                    <HashLink onClick={() => this.closeMenu()} smooth to="/rooms">Split</HashLink> :
                    <HashLink onClick={() => this.closeMenu()} smooth to="/sign-in">Split</HashLink>
                }
                <HashLink onClick={() => this.closeMenu()} smooth to="/#about">About</HashLink>
                <HashLink onClick={() => this.closeMenu()} smooth to="/#how-to-use">How to use</HashLink>
                {this.renderLink()}
            </Menu>
        );
    }
};

const mapStateToProps = ({auth: {isLoggedIn}}) => {
    return{
        isLoggedIn
    }
}

const mapDispatchToProps = {
    logout
}


export default WithAuthService()(connect(mapStateToProps, mapDispatchToProps)(Burger));