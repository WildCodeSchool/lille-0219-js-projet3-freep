import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from "react-feather";
import { Row, Col } from "reactstrap";
import { backend } from "../conf";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: ""
    };
  }
  validateForm() {
    return (
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.email.length > 0 &&
      this.state.location.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    let {
      firstname,
      lastname,
      nickname,
      email,
      password,
      confirmPassword,
      location
    } = this.state;
    const { history } = this.props;
    if (password === confirmPassword) {
      axios
        .post(`https://backend.freep-app.fr/auth/users`, {
          firstname,
          lastname,
          nickname,
          email,
          password,
          location
        })
        .then(({ data }) => {
          this.setState({
            firstname: data.firstname,
            lastname: data.lastname,
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            location: data.location
          });
          history.push("/accueil");
        });
    }
  };
  render() {
    return (
      <div className="Registration">
        <Form onSubmit={this.handleSubmit}>
          <h2 className="text-center"> Rejoins la communauté Freep !</h2>
          <Button
            className="facebook"
            href="https://fr-fr.facebook.com/login/"
            role="button"
            title="Lien"
          >
            Inscris-toi avec Facebook
          </Button>
          <div className="trait" />
          <Row>
            <Col xs="6">
              <Form.Group controlId="firstname">
                <label htmlFor="firstname">Prénom</label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="6">
              <Form.Group controlId="lastname">
                <label htmlFor="lastname">Nom</label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="6">
              <Form.Group controlId="nickname">
                <label htmlFor="nickname">Pseudo</label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="6">
              <Form.Group controlId="location">
                <label htmlFor="location">Ville</label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="12">
              <Form.Group controlId="email">
                <label htmlFor="email">E-mail</label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="6">
              <Form.Group controlId="password">
                <label htmlFor="pwd">Mot de passe</label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
            </Col>
            <Col xs="6">
              <Form.Group controlId="confirmPassword">
                <label htmlFor="pwd">Confirme ton mot de passe</label>
                <Form.Control
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="myButton"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Rejoins-nous !
          </Button>
          <div className="registration-link">
            <Link to="/">
              Déjà inscrite ? Connecte-toi !
              <Heart width="12" className="mx-1" />
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}
export default Registration;
