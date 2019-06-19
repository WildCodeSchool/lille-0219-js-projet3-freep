import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Plus, Mail, Heart, User } from "react-feather";

class NavFreep extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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
          <div className="navText">
            <span className="navTitle">Freep</span>
            <br />
            <span className="navCatch">La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <form action="">
              <label htmlFor="clothe-profile-search">
                <input
                  type="text"
                  placeholder="Chercher un vêtement, un profil..."
                />
                <input type="submit" value="&#x1F50E;" />
              </label>
            </form>
            <Nav className="ml-auto" navbar>
              <NavLink to="/">
                <Plus className="img" color="black" />
              </NavLink>
              <NavLink to="/messagerie">
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
