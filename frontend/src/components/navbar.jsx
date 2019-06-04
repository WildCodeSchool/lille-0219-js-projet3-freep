import React, { Fragment } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  NavLink,
  Nav,
  NavItem,
  Badge
} from "reactstrap";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing";
import { Camera, Plus, Mail, Heart, User } from 'react-feather';
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

                  <Nav className="d-flex ml-auto picto" horizontal="end" navbar>
                      <NavLink href="#">
                          <Plus />
                      </NavLink>
                      <NavLink href="#">
                          <Mail />
                      </NavLink>
                      <NavLink href="#">
                          <Heart />
                      </NavLink>
                      <NavLink href="#">
                          <User />
                      </NavLink>
                  </Nav>
                </Navbar>

                <div className="title">
                  <span>Freep</span>
                  <br />
                  <span>baseLine</span>
                </div>

                <form className="recherche">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend" />
                    <Input placeholder="Rechercher un vêtement ou une cliente" />
                    <Link to="/">
                      <button className="buto ml-2">Rechercher</button>
                    </Link>
                  </InputGroup>
                </form>
              </div>
            </Fragment>
            <Routing />
          </div>
        </Router>
      </Fragment>
    );
  }
}
export default NavFreep;
