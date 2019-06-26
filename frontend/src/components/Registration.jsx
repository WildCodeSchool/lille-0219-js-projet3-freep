import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";

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
      <div className="Registration">
        <Form onSubmit={this.handleSubmit}>
          <h1 className="titleConnect"> Rejoins la communauté Freep </h1>

          <Form.Group controlId="firstName" bsSize="large">
            <label for="firstName"> Prénom </label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName" bsSize="large">
            <label for="lastName"> Nom </label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="username" bsSize="large">
            <label for="username"> Nom d'utilisateur </label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" bsSize="large">
            <label for="email">E-mail</label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <label for="pwd">Mot de passe </label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" bsSize="large">
            <label for="pwd">Confirme ton mot de passe </label>
            <Form.Control
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            className="myButton"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Rejoins nous !
          </Button>
        </Form>
      </div>
    );
  }
}

export default Registration;
