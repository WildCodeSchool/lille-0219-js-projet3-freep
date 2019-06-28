import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Tag, PlusCircle, Mail, Heart, User } from "react-feather";
import { Modal, ModalHeader } from "reactstrap";
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
          <Link to="/accueil">
            <img className="logo" src="../pictures/logo.png" alt="logo" />
          </Link>
          <div className="navText">
            <span className="navTitle">Freep</span>
            <br />
            <span className="navCatch">La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggleBurger} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <form>
              <label htmlFor="clothe-profile-search">
                <input
                  type="text"
                  placeholder="Cherche un vêtement ou un profil..."
                />
                <input type="submit" />
                <img
                  className="magnifier"
                  src="../pictures/loupe.png"
                  alt="magnifier"
                />
              </label>
            </form>
            <Nav className="ml-auto text-center" navbar>
              <NavLink
                to=""
                onClick={this.toggleModal}
                title="Propose ton vêtement !"
              >
                <PlusCircle
                  className="img"
                  color="black"
                  onClick={this.toggleModal}
                />
                <p>Upload</p>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal} className="pr-5" />
                  <Uploader />
                </Modal>
              </NavLink>
              <NavLink
                onClick={this.toggleBurger}
                to="/partenaire"
                title="Découvre nos partenaires !"
              >
                <Tag className="img" color="black" />
                <p>Partenaires</p>
              </NavLink>
              <NavLink
                onClick={this.toggleBurger}
                to="/messagerie/2"
                title="Parle avec nos Freepeuses"
              >
                <Mail className="img" color="black" />
                <p>Messagerie</p>
              </NavLink>
              <NavLink
                to="/emprunt/1"
                title="Retrouve les vêtements que tu souhaites emprunter"
              >
                <Heart className="img" color="black" />
                <p>Favoris</p>
              </NavLink>
              <NavLink
                onClick={this.toggleBurger}
                to="/profil/1"
                title="Accède à ton profil"
              >
                <User className="img" color="black" />
                <p>Profil</p>
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavFreep;
