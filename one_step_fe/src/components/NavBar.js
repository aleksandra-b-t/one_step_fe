import React from 'react';
import {Navbar} from 'react-bootstrap';



const NavBar = props => {
    return(
        <Navbar >
            <Navbar.Brand href="#home">
            <img
                src="/logo.png"
                width="200"
                height="90"
                className="d-inline-block align-top"
                alt="logo"
            />
            </Navbar.Brand>
         </Navbar>
    )
}

export default NavBar