import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart } from "react-feather";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      id: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { email, password } = this.state;
    const { history } = this.props;
    axios
      .post(`https://backend.freep-app.fr/auth/login`, {
        email,
        password
      })
      .then(({ data }) => {
        this.setState({
          login: { email: data.email, password: data.password, id: data.id }
        });
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/accueil");
      });
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <h2>Prête pour de nouvelles aventures ? </h2>
          <Button
            className="facebook"
            href="https://fr-fr.facebook.com/login/"
            role="button"
            title="Lien"
          >
            Connecte-toi avec Facebook
          </Button>
          <div className="trait" />
          <Form.Group controlId="email">
            <label htmlFor="email">E-mail</label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <label htmlFor="pwd">Mot de passe</label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            className="myButton"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Connecte-toi !
          </Button>
          <Link to="" className="forgotten-password">
            Mot de passe oublié ?
          </Link>
          <div className="registration-link">
            <Link to="/inscription">
              Pas encore de compte ? Inscris-toi !
              <Heart width="12" className="mx-1" />
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}
export default Login;
