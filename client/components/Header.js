import React from "react";
import { Nav, Navbar, NavItem, Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/header.css";

const Header = () => (
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Prince Mukka</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1}>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/resume">Resume</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/blog">Blog</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/photography">Photography</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/resources">Resources</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
