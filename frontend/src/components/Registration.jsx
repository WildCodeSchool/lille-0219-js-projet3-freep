import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import LoginBackground from "../pictures/Login.jpg";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      nickname: "",
      email: "",
      password: ""
      // confirmPassword: ""
    };
  }

  validateForm() {
    return (
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password //=== this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { firstname, lastname, nickname, email, password } = this.state;
    axios
      .post("http://localhost:5050/auth/users", {
        firstname,
        lastname,
        nickname,
        email,
        password
      })
      .then(({ data }) => {
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          nickname: data.nickname,
          email: data.email,
          password: data.password
        });
        console.log(data);
      });
  };

  render() {
    console.log(this.state);
    return (
      <div
        className="Registration"
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
            text: "center",
            background: "#f5f5f5",
            padding: "5vh",
            margin: "50px",
            borderRadius: "10px",
            boxShadow: ".5rem 1rem 1rem rgba(0,0,0,.2)"
          }}
        >
          <h1 className="titleConnect"> Rejoins la communauté Freep </h1>

          <Form.Group controlId="firstname" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
                fontFamily: "DancingScript"
              }}
              for="firstname"
            >
              Prénom
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastname" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
                fontFamily: "DancingScript"
              }}
              for="lastname"
            >
              Nom
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="nickname" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
                fontFamily: "DancingScript"
              }}
              for="nickname"
            >
              Nom d'utilisateur
            </h1>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.nickname}
              onChange={this.handleChange}
            />
          </Form.Group>

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
              for="password"
            >
              Mot de passe
            </h1>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          {/* <Form.Group controlId="confirmPassword" bsSize="large">
            <h1
              style={{
                fontSize: "20px",
                color: "goldenrod",
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
          </Form.Group> */}
          <Button
            style={{ border: " 1px solid black" }}
            className="myButton"
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="submit"
          >
            Rejoins-nous !
          </Button>
        </Form>
      </div>
    );
  }
}

export default Registration;
