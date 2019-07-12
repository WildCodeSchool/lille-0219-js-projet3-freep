import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Tag, PlusCircle, Mail, Shuffle, User } from "react-feather";
import { Modal, ModalHeader } from "reactstrap";
import Uploader from "./Upload";
import classnames from "classnames";

class NavFreep extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBurger = this.toggleBurger.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isOpen: false,
      modal: false,
      modalPicture: false,
      profile: "",
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  toggleModalPicture() {
    this.setState(prevState => ({
      modalPicture: !prevState.modalPicture
    }));
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
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if ("user" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
      this.setState({
        profile: currentUser
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    return (
      <div
        className={classnames("header", {
          "header--hidden": !this.state.visible
        })}
      >
        <Navbar color="light" light expand="md">
          <Link to="/accueil">
            <img className="logo" src="../pictures/logo.png" alt="logo" />
          </Link>
          <div className="navText">
            <span className="navCatch">La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggleBurger} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <form className="recherche_demo">
              <label htmlFor="clothe-profile-search">
                <input
                  type="search"
                  placeholder="Recherche une utilisatrice ou un vêtement"
                />
                <input type="submit" />
                <img
                  className="magnifier"
                  src="../pictures/loupe.png"
                  alt="loupe"
                />
              </label>
            </form>
            <Nav className="ml-auto" navbar>
              <div title="Propose ton vêtement !" to="">
                <PlusCircle
                  className="img"
                  color="#222"
                  onClick={this.toggleModal}
                />
                o
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggleModal}
                  onClosed={() => this.toggleModalPicture}
                >
                  <ModalHeader toggle={this.toggleModal} className="pr-5" />
                  <Uploader
                    modalClothe={this.toggleModal}
                    modalPicture={this.state.modalPicture}
                    toggleModalPicture={() => {
                      this.toggleModalPicture();
                    }}
                  />
                </Modal>
              </div>
              <NavLink
                to={`/partenaire/${this.state.profile}`}
                title="Découvre nos partenaires !"
              >
                <Tag className="img" color="#222" />
              </NavLink>
              <NavLink
                to={`/messagerie/${this.state.profile}`}
                title="Parle avec nos Freepeuses"
              >
                <Mail className="img" color="#222" />
              </NavLink>
              <NavLink
                to={`/emprunt/${this.state.profile}`}
                title="Retrouve les vêtements que tu souhaites emprunter"
              >
                <Shuffle className="img" color="#222" />
              </NavLink>
              <NavLink
                to={`/profil/${this.state.profile}`}
                title="Accède à ton profil"
              >
                <User className="img" color="#222" />
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavFreep;
