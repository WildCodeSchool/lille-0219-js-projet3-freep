import React, { Fragment } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  NavLink,
  Nav,
} from "reactstrap";
import {  BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing";
import {  Plus, Mail, Heart, User } from "react-feather";
import "../style/navbar.css";

class NavFreep extends React.Component {
  render() {
    return (
      <Fragment>
        <Router>
          <div className="header">
            <Fragment>
              <div className="menu">
                <Navbar color="black" light expand="md">
                  <img
                    className="logo"
                    src="https://placekitten.com/100/100"
                    alt=""
                  />
                </Navbar>
                <div className="title">
                  <span>Freep</span>
                  <br />
                  <span>La garde robe qui rapporte</span>
                </div>
                  <form className="recherche">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend" />
                      <Input className="search" placeholder="Rechercher un vêtement ou une cliente" />
                    </InputGroup>
                  </form>
                  <div className="picto">
                <Nav className="d-flex ml-auto" horizontal="end" navbar>
                  <NavLink href="#">
                    <Plus className="img" color="black" />
                  </NavLink>
                  <NavLink href="#">
                    <Mail className="img" color="black" />
                  </NavLink>
                  <NavLink href="#">
                    <Heart className="img" color="black" />
                  </NavLink>
                  <NavLink href="#">
                    <User className="img" color="black" />
                  </NavLink>
                </Nav>
                </div>
              </div>
            </Fragment>
            <Routing />
          </div>
        </Router>
        <hr />
      </Fragment>
    );
  }
}
export default NavFreep;
