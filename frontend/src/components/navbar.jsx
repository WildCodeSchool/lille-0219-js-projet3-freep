import React, { Fragment } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  NavLink,
  Nav,
  Form,
  Container, Row, Col,
NavbarBrand,
NavbarToggler,
NavItem,
Collapse
} from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing";
import { Plus, Mail, Heart, User } from "react-feather";
import "../style/navbar.css";



class NavFreep extends React.Component {
  render() {
    return (
        <div className="header">
        <Navbar color="light" light expand="md">
        <Navbar color="black" light>
                    <img
                      className="logo"
                      src="https://via.placeholder.com/100"
                      alt="logo"
                    />
                  </Navbar>
                  <div className="title">
                    <span>Freep</span>
                    <br />
                    <span>La garde robe qui rapporte</span>
                  </div>
          <NavbarToggler onClick={this.toggle} />
          <Form className="recherche">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend" />
                      <Input
                        className="search"
                        placeholder="Rechercher un vêtement ou une cliente"
                      />
                    </InputGroup>
                  </Form>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>

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
          </Collapse>
        </Navbar>
        <hr />
      </div>
    );
  }
}

export default NavFreep;
