import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "reactstrap";
import "../style/EditProfile.css";
import axios from "axios";
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      location: "",
      description: "",
      avatar: ""
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://localhost:5050/monprofil/${currentUser}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(({ data }) => {
        console.log("TCL: EditProfile -> data", data);
        this.setState({
          username: data.nickname,
          location: data.location,
          description: data.description,
          avatar: data.avatar
        });
      });
  }

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.location.length > 0 &&
      this.state.description.length > 0 &&
      this.state.avatar.length > 0
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
            <Form.Group controlId="location" bsSize="large">
              <h1
                style={{
                  fontSize: "20px",
                  color: "goldenrod",
                  fontFamily: "DancingScript"
                }}
                for="location"
              >
                {" "}
                Ville{" "}
              </h1>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description" bsSize="large">
              <h1
                style={{
                  fontSize: "20px",
                  color: "goldenrod",
                  fontFamily: "DancingScript"
                }}
                for="description"
              >
                {" "}
                Description{" "}
              </h1>
              <Form.Control
                as="textarea"
                rows="3"
                autoFocus
                type="text"
                value={this.state.description}
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
