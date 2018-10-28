import React, { Component } from 'react';
import { Navbar, Nav , NavItem , } from "react-bootstrap";
import { slide as BurgerMenu } from "react-burger-menu";
import "./Header.css";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (       
            <BurgerMenu className="bm-menu" disableCloseOnEsc  customBurgerIcon={false} slide="pushRotate">
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="product" className="menu-item" href="/product">Product</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
            </BurgerMenu>
         
    );
  }
}

export default Header;
