import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import LoginBackground from "../pictures/Login.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";
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
      .post(`http://localhost:5050/auth/login`, {
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
      <div
        className="Login"
        style={{
          backgroundImage: `url(${LoginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh"
        }}
      >
        <Form
          onSubmit={this.handleSubmit}
          style={{
            background: "#f5f5f5",
            padding: "5vh",
            borderRadius: "10px",
            boxShadow: ".5rem 1rem 1rem rgba(0,0,0,.2)"
          }}
        >
          <h1 className="titleConnect">Prête pour de nouvelles aventures ? </h1>
          <Button
            className="facebook"
            href="https://fr-fr.facebook.com/login/"
            class="facebook"
            role="button"
            title="Lien"
            style={{
              fontSize: "15px",
              borderRadius: "50px",
              backgroundColor: "bleu",
              marginBottom: "30px",
              marginTop: "30px"
            }}
          >
            Connecte toi avec Facebook
          </Button>
          <div class="trait" />
          <Form.Group controlId="email" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              htmlFor="email"
            >
              E-mail
            </h1>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              htmlFor="pwd"
            >
              Mot de passe
            </h1>
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
          <div>
            <NavLink
              activeClassName="active"
              className="littleInfo"
              exact
              to=""
            >
              Mot de passe oublié ?
            </NavLink>
          </div>
          <NavLink
            activeClassName="active"
            className="littleInfo"
            exact
            to="/Registration"
          >
            Pas encore de compte ? Inscris-toi ! 🖤
          </NavLink>
        </Form>
      </div>
    );
  }
}
export default Login;
