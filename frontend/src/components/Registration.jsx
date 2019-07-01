import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import LoginBackground from "../pictures/Login.jpg";
import { NavLink } from "react-router-dom";
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  validateForm() {
    return (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
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
  };
  render() {
    return (
      <div
        className="Registration"
        style={{
          backgroundImage: `url(${LoginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500%"
        }}
      >
        <Form
          onSubmit={this.handleSubmit}
          style={{
            text: "center",
            background: "#f5f5f5",
            padding: "5vh",
            margin: "50px",
            borderRadius: "10px",
            boxShadow: ".5rem 1rem 1rem rgba(0,0,0,.2)"
          }}
        >
          <h1 className="titleConnect"> Rejoins la communauté Freep 🌸</h1>
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
            Inscris-toi avec Facebook
          </Button>
          <div class="trait" />
          <Form.Group controlId="firstName" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="firstName"
            >
              {" "}
              Prénom{" "}
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="lastName"
            >
              {" "}
              Nom{" "}
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="username" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="username"
            >
              {" "}
              Nom d'utilisateur{" "}
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="email"
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
          <Form.Group controlId="password" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="pwd"
            >
              Mot de passe{" "}
            </h1>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "DancingScript"
              }}
              for="pwd"
            >
              Confirme ton mot de passe{" "}
            </h1>
            <Form.Control
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            style={{ border: " 1px solid black" }}
            className="myButton"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Rejoins nous ! 💟
          </Button>
          <NavLink
            activeClassName="active"
            className="littleInfo"
            exact
            to="/Login"
          >
            Déjà inscris ? Connecte toi !
          </NavLink>
        </Form>
      </div>
    );
  }
}
export default Registration;
