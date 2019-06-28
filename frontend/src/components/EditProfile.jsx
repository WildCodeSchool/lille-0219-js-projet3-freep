import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "reactstrap";
class EditProfile extends React.Component {
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
      <React.Fragment>
        <h1 className="titleConnect">Modifie ton profil !</h1>
        <Row>
          <Col>
            <Form.Group controlId="username" bsSize="large">
              <h1
                style={{
                  fontSize: "20px",
                  color: "goldenrod",
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
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
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
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="confirmPassword" bsSize="large">
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
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          style={{ border: " 1px solid black" }}
          className="myButton"
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
        >
          Valider
        </Button>
      </React.Fragment>
    );
  }
}

export default EditProfile;
