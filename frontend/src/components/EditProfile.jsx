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
      id: "",
      nickname: "",
      location: "",
      description: ""
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;

    axios
      .get(`http://localhost:5050/modification/${currentUser}`)
      .then(({ data }) => {
        this.setState({
          id: data.id,
          nickname: data.nickname,
          location: data.location,
          description: data.description
        });
      });
  }

  validateForm() {
    const nickname = this.state.nickname;
    return nickname && nickname.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    const currentUser = this.state.id;
    event.preventDefault();
    axios
      .put(`http://localhost:5050/modification/${currentUser}`, {
        nickname: this.state.nickname,
        location: this.state.location,
        description: this.state.description
      })
      .then(() => {
        this.props.history.push(`/profil/${currentUser}`);
      })
      .catch(err => {
        console.log(`Nope! ${err}`);
      });
  }

  render() {
    const nickname = this.state.nickname;
    const location = this.state.location;
    const description = this.state.description;
    return (
      <React.Fragment>
        <Form
          onSubmit={event => {
            this.handleSubmit(event);
          }}
        >
          <h1 className="titleConnect">Modifie ton profil !</h1>
          <Row>
            <Col>
              <Form.Group controlId="nickname">
                <h1
                  style={{
                    fontSize: "20px",
                    color: "goldenrod",
                    fontFamily: "DancingScript"
                  }}
                  htmlFor="nickname"
                >
                  {" "}
                  Nom d'utilisateur *{" "}
                </h1>
                <Form.Control
                  autoFocus
                  type="text"
                  value={nickname}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="location">
                <h1
                  style={{
                    fontSize: "20px",
                    color: "goldenrod",
                    fontFamily: "DancingScript"
                  }}
                  htmlFor="location"
                >
                  {" "}
                  Ville{" "}
                </h1>
                <Form.Control
                  autoFocus
                  type="text"
                  value={location}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <h1
                  style={{
                    fontSize: "20px",
                    color: "goldenrod",
                    fontFamily: "DancingScript"
                  }}
                  htmlFor="description"
                >
                  {" "}
                  Description{" "}
                </h1>
                <Form.Control
                  as="textarea"
                  rows="3"
                  autoFocus
                  type="text"
                  value={description}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <h1
            style={{
              fontSize: "20px",
              color: "goldenrod",
              fontFamily: "DancingScript"
            }}
            htmlFor="description"
          >
            * Champ obligatoire
          </h1>
          <Button
            style={{ border: "1px solid black" }}
            className="myButton"
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Valider
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditProfile;
