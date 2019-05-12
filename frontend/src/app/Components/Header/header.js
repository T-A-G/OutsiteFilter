import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../Imgs/logo.svg'
import './header.scss'
import { Navbar,Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import ROUTES from '../../Routes/rootsdirectory'



const NavbarLinks = function(props){
  return(
    <div>
    <a href={ROUTES.locations.path}>Book</a>
    </div>
  )
}

class Header extends Component {
  render() {
    return (
      <Navbar id='navbar'>
        <Navbar.Brand href="/"><img src={Logo}/></Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href={ROUTES.locations.path}>Book</Nav.Link>
            <Nav.Link href='/'><FaUser/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}

export default Header;
