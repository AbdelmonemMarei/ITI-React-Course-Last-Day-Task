import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";


function NavbarComponent() {
  const {currentUser, logOut} = useAuth();
  console.log(currentUser);
      return (
        <Navbar expand="lg" className="bg-body-tertiary py-3">
          <Container>
            <NavLink to="/" className="navbar-brand">Ecommerce Website</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
              </Nav>
                <NavLink to="/cart" className="nav-link text-dark p-2 mx-2 rounded position-relative" style={{width:"fit-content"}}>
                  <FaShoppingCart/>
                  <Badge bg="danger" className="position-absolute badge rounded-pill" style={{top:"0px", right:"-10px"}}>{currentUser?.cart?.length || 0}</Badge>
                </NavLink>
                {currentUser ? (
                  <>
                  <p className="mb-0">Hello,{currentUser.username}</p>
                  <NavLink to="/login" className="nav-link text-white bg-danger p-2 mx-2 rounded" onClick={logOut}>Logout</NavLink>
                  </>
                ) : 
                  null
                }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    

export default NavbarComponent
