import React from 'react';
import {Navbar, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'



const NavBar = props => {
    return(
        <Navbar >
            <img
                src="/logo.png"
                width="150"
                height="70"
                className="d-inline-block align-top"
                alt="logo"
            />
            { props.user !== null ? <Button onClick={ props.logout } className="ml-auto">Log Out</Button>:
                null}
            
         </Navbar>
    )
}

export default NavBar