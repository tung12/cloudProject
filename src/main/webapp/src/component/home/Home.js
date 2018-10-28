import React, { Component } from 'react';
import { Navbar, Nav , NavItem} from "react-bootstrap";
import { Link } from "react-router-dom";
import  Header  from "../header/Header.js";
class Home extends Component {
  render() {
    return (
        <div className="homePage">
          <Header />
        </div>
     
    );
  }
}

export default Home;
