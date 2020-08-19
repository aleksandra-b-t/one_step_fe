import React from "react";
import {
  Navbar,
  Button,
  Container,
  Col,
  Row,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="nav">
      <nav className="nav-bar">
        <ul> <li>
          <div className="text-left">
            {/* {" "} */}
            You just need
          </div></li>
          <li><div>
            {/* {" "} */}
            <img src="/logo01.png" width="250" height="100" alt="logo" />
          </div></li>
          <li><div className="text-right">to change your life ...</div></li>
        
        </ul>
      </nav>
        {props.user !== {} ? (
          <button onClick={props.logout} className="ml-auto">
            LogOut
          </button>
        ) : null}
    </div>
  );
};

export default NavBar;
