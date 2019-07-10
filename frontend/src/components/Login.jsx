import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
=======
import { Heart } from "react-feather";
>>>>>>> 825478e31ae0c5e757c58e3d8632b3a41b1b219c

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
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/accueil");
      });
  };

  render() {
    return (
<<<<<<< HEAD
      <div
        className="Login"
        style={{
          backgroundImage: `url(${LoginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
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
=======
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <h2>Prête pour de nouvelles aventures ? </h2>
>>>>>>> 825478e31ae0c5e757c58e3d8632b3a41b1b219c
          <Button
            className="facebook"
            href="https://fr-fr.facebook.com/login/"
            role="button"
            title="Lien"
          >
            Connecte-toi avec Facebook
          </Button>
<<<<<<< HEAD
          <div class="trait" />

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

=======
          <div className="trait" />
          <Form.Group controlId="email">
            <label htmlFor="email">E-mail</label>
>>>>>>> 825478e31ae0c5e757c58e3d8632b3a41b1b219c
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
<<<<<<< HEAD
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
=======
          <Form.Group controlId="password">
            <label htmlFor="pwd">Mot de passe</label>
>>>>>>> 825478e31ae0c5e757c58e3d8632b3a41b1b219c
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>

          <Button
            class="myButton"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Connecte toi !
          </Button>
<<<<<<< HEAD

          <div>
            <NavLink
              activeClassName="active"
              className="littleInfo"
              exact
              to=""
            >
              Mot de passe oublié ?
            </NavLink>
=======
          <Link to="" className="forgotten-password">
            Mot de passe oublié ?
          </Link>
          <div className="registration-link">
            <Link to="/inscription">
              Pas encore de compte ? Inscris-toi !
              <Heart width="12" className="mx-1" />
            </Link>
>>>>>>> 825478e31ae0c5e757c58e3d8632b3a41b1b219c
          </div>
        </Form>
      </div>
    );
  }
}
export default Login;
