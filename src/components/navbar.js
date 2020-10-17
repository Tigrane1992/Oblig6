
import React, { Component } from 'react'; 
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"

class navbar extends Component {
    render(){ 
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">HIOF</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#">User user</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}
}

export default navbar
