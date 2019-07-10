import React from "react";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Tag, PlusCircle, Mail, Heart, User } from "react-feather";
import { Modal, ModalHeader } from "reactstrap";
import Uploader from "./Upload";
import axios from "axios";
import { connect } from "react-redux";
import { setResultsActions } from "../Redux/actions";

class NavFreep extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBurger = this.toggleBurger.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isOpen: false,
      modal: false,
      keyword: "",
      searchResult: "",
      tab: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    const result = e.target.value;
    this.setState({ searchResult: result });
  }

  handleReset(e) {
    this.setState({
      tab: []
    });
  }

  handleSubmit = e => {
    if (e) e.preventDefault();
    axios
      .post(`http://localhost:5050/search`, {
        keyword: this.state.searchResult
      })
      .then(res => {
        const { dispatch } = this.props;
        dispatch(setResultsActions(res.data));
      })
      .catch(err => {
        console.log("Error :" + err);
      });
  };

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
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="clothe-profile-search">
                <input
                  type="text"
                  placeholder="Cherche un vêtement ou un profil..."
                  value={this.state.searchResult}
                  onChange={this.handleChange}
                />
                <input type="submit" />
                <Link to={`/search`}>
                  <img
                    className="magnifier"
                    src="../pictures/loupe.png"
                    alt="magnifier"
                  />
                </Link>
              </label>
            </form>
            <Nav className="ml-auto" navbar>
              <NavLink title="Propose ton vêtement !">
                <PlusCircle
                  className="img"
                  color="black"
                  onClick={this.toggleModal}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal} className="pr-5" />
                  <Uploader />
                </Modal>
              </NavLink>
              <NavLink to="/partenaire" title="Découvre nos partenaires !">
                <Tag className="img" color="black" />
              </NavLink>
              <NavLink to="/messagerie/2" title="Parle avec nos Freepeuses">
                <Mail className="img" color="black" />
              </NavLink>
              <NavLink
                to="/emprunt/1"
                title="Retrouve les vêtements que tu souhaites emprunter"
              >
                <Heart className="img" color="black" />
              </NavLink>
              <NavLink to="/profil/1" title="Accède à ton profil">
                <User className="img" color="black" />
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restab: state
});

const NavFreepContainer = connect(mapStateToProps)(NavFreep);

export default NavFreepContainer;
