import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Upload, Mail, Heart, User } from "react-feather";
import { Modal } from "reactstrap";
import Uploader from "./Upload";

class NavFreep extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      modal: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className="header">
        <Navbar color="light" light expand="md">
          <Navbar color="black" light>
            <Link to="/">
              <img className="logo" src="../pictures/logo.png" alt="logo" />
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
              <NavLink title="Propose ton vêtement !">
                <Upload className="img" color="black" onClick={this.toggle} />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <Uploader />
                </Modal>
              </NavLink>
              <NavLink to="/partenaire">
                <Tag className="img" color="black" />
              </NavLink>
              <NavLink to="/messagerie/1">
                <Mail className="img" color="black" />
              </NavLink>
              <NavLink to="/favoris">
                <Heart className="img" color="black" />
              </NavLink>
              <NavLink to="/profil/1">
                <User className="img" color="black" />
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavFreep;
