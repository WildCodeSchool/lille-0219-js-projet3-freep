import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import LoginBackground from "../pictures/Login.jpg";
import { NavLink } from "react-router-dom";

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
          <Form.Group controlId="email" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
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
                color: "goldenrod",
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
          <div className="remember">
            <input
              refs="remember_me"
              value={true}
              id="checkbox1"
              type="checkbox"
            />
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
                fontFamily: "DancingScript"
              }}
              For="checkbox1"
            >
              Se souvenir de moi
            </h1>
          </div>

          <Button
            class="myButton"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            style={{ border: " 1px solid black" }}
          >
            > Connecte toi !
          </Button>
          <NavLink
            activeClassName="active"
            className="littleInfo"
            exact
            to="/Registration"
          >
            Inscrit toi ! ❀
          </NavLink>
        </Form>
      </div>
    );
  }
}
export default Login;
