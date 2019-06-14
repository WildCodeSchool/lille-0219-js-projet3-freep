import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  Nav,
  Form,
  NavbarToggler,
  Collapse
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Plus, Mail, Heart, User } from "react-feather";

class NavFreep extends React.Component {
  render() {
    return (
      <div className="header">
        <Navbar color="light" light expand="md">
          <Navbar color="black" light>
            <Link to="/">
              <img
                className="logo"
                src="https://via.placeholder.com/100"
                alt="logo"
              />
            </Link>
          </Navbar>
          <div className="title">
            <span>Freep</span>
            <br />
            <span>La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Form className="search-input">
            <InputGroup>
              <InputGroupAddon addonType="prepend" />
              <button id="loupe" type="submit" class="icone-loupe" />
              <Input
                className="search"
                placeholder="Rechercher un vêtement ou une cliente"
              />
            </InputGroup>
          </Form>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavLink to="/">
                <Plus className="img" color="black" />
              </NavLink>
              <NavLink top="/messagerie">
                <Mail className="img" color="black" />
              </NavLink>
              <NavLink to="/favoris">
                <Heart className="img" color="black" />
              </NavLink>
              <NavLink to="/profil">
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
