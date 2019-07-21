import React from "react";
import logo from "../pictures/logo.png";
import magnifier from "../pictures/loupe.png";
import { Navbar, Nav, NavbarToggler, Collapse } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Tag, PlusCircle, Mail, Shuffle, User } from "react-feather";
import { Modal, ModalHeader } from "reactstrap";
import Uploader from "./Upload";
import axios from "axios";
import { connect } from "react-redux";
import { setResultsActions } from "../Redux/actions";
import classnames from "classnames";
import { backend } from "../conf";

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
      tab: [],
      profile: "",
      prevScrollpos: window.pageYOffset,
      visible: true,
      width: window.innerWidth
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
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if ("user" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
      this.setState({
        profile: currentUser
      });
    }
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
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
      .post(`${backend}/search`, {
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

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 640;
    return (
      <div
        className={classnames("header", {
          "header--hidden": !this.state.visible
        })}
      >
        <Navbar color="light" light expand="md">
          <Link to="/accueil">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="navText">
            <span className="navCatch">La garde robe qui rapporte</span>
          </div>
          <NavbarToggler onClick={this.toggleBurger} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <form className="recherche_demo" onSubmit={this.handleSubmit}>
              <label htmlFor="clothe-profile-search">
                <input
                  type="search"
                  placeholder="Recherche une utilisatrice ou un vêtement"
                  value={this.state.searchResult}
                  onChange={this.handleChange}
                />
                <input type="submit" />
                <Link to={`/search`}>
                  <img className="magnifier" src={magnifier} alt="magnifier" />
                </Link>
              </label>
            </form>
            <Nav className="ml-auto text-center" navbar>
              {isMobile ? (
                <NavLink to="" title="Propose ton vêtement !">
                  <PlusCircle
                    className="img"
                    color="#222"
                    onClick={this.toggleModal}
                  />
                  <p>Upload</p>
                  <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} className="pr-5" />
                    <Uploader />
                  </Modal>
                </NavLink>
              ) : (
                <NavLink to="" title="Propose ton vêtement !">
                  <PlusCircle
                    className="img"
                    color="#222"
                    onClick={this.toggleModal}
                  />
                  <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} className="pr-5" />
                    <Uploader />
                  </Modal>
                </NavLink>
              )}
              {isMobile ? (
                <NavLink
                  to={`/partenaire/${this.state.profile}`}
                  onClick={this.toggleBurger}
                  title="Découvre nos partenaires !"
                >
                  <Tag className="img" color="#222" />
                  <p>Partenaires</p>
                </NavLink>
              ) : (
                <NavLink
                  to={`/partenaire/${this.state.profile}`}
                  title="Découvre nos partenaires !"
                >
                  <Tag className="img" color="#222" />
                </NavLink>
              )}
              {isMobile ? (
                <NavLink
                  to={`/messagerie/${this.state.profile}`}
                  onClick={this.toggleBurger}
                  title="Parle avec nos Freepeuses"
                >
                  <Mail className="img" color="#222" />
                  <p>Messagerie</p>
                </NavLink>
              ) : (
                <NavLink
                  to={`/messagerie/${this.state.profile}`}
                  title="Parle avec nos Freepeuses"
                >
                  <Mail className="img" color="#222" />
                </NavLink>
              )}
              {isMobile ? (
                <NavLink
                  to={`/emprunt/${this.state.profile}`}
                  onClick={this.toggleBurger}
                  title="Retrouve les vêtements que tu souhaites emprunter"
                >
                  <Shuffle className="img" color="#222" />
                  <p>Emprunts</p>
                </NavLink>
              ) : (
                <NavLink
                  to={`/emprunt/${this.state.profile}`}
                  title="Retrouve les vêtements que tu souhaites emprunter"
                >
                  <Shuffle className="img" color="#222" />
                </NavLink>
              )}
              {isMobile ? (
                <NavLink
                  to={`/profil/${this.state.profile}`}
                  onClick={this.toggleBurger}
                  title="Accède à ton profil"
                >
                  <User className="img" color="#222" />
                  <p>Profil</p>
                </NavLink>
              ) : (
                <NavLink
                  to={`/profil/${this.state.profile}`}
                  title="Accède à ton profil"
                >
                  <User className="img" color="#222" />
                </NavLink>
              )}
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
