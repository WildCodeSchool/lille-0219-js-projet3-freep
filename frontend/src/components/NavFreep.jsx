import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Tag, Upload, Mail, Heart, User } from "react-feather";
import { Modal } from "reactstrap";
import Uploader from "./Upload";

class NavFreep extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBurger = this.toggleBurger.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isOpen: false,
      modal: false
    };
  }
  toggleBurger() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className="header">
        <Navbar color="light" light expand="md">
          <Link to="/">
            <img className="logo" src="../pictures/logo.png" alt="logo" />
          </Link>
          <div className="navText">
            <span className="navTitle">Freep</span>
            <br />
            <span className="navCatch">La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggleBurger} />
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
                <Upload
                  className="img"
                  color="black"
                  onClick={this.toggleModal}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <Uploader />
                </Modal>
              </NavLink>
              <NavLink to="/partenaire">
                <Tag className="img" color="black" />
              </NavLink>
              <NavLink to="/messagerie/2">
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
