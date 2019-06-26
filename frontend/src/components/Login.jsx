import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <h1 className="titleConnect">Prête pour de nouvelles aventures ? </h1>
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
          <div className="remember">
            <input
              refs="remember_me"
              value={true}
              id="checkbox1"
              type="checkbox"
            />
            <label For="checkbox1">Se souvenir de moi</label>
          </div>
          <Button
            class="Button"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Connecte toi !
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
