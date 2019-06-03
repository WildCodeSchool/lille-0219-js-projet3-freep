import React, { Fragment } from "react";
import { InputGroup, InputGroupAddon, Input, NavbarToggler, Navbar } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "../style/navbar.css";

class NavFreep extends React.Component {
  render() {
    return (
      <Fragment>
           <div className="menu">
            <Navbar color="black" light expand="md">
                <ul>
                  <li><NavLink activeClassName="active" exact to="/">
                    <img className="logo" src="https://via.placeholder.com/300.png/09f/fff" alt="logo Freep" />
                  </NavLink></li>
                </ul>
              <NavbarToggler color="light" onClick="" />

                <ul>
                  <div className="nav-item">
                  </div>
                </ul>
                </Navbar>
                <form className="recherche">
              <InputGroup>
                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                <Input placeholder="Rechercher un vêtement ou un client"
                  value=""
                  onChange=""
                />
              </InputGroup>
            </form>
            </div>
      </Fragment>
    );
  }
}

export default NavFreep;