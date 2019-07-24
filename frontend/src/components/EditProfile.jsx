import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Modal, ModalHeader, Input } from "reactstrap";
import "../style/EditProfile.scss";
import "../style/Avatar.scss";
import axios from "axios";
import { backend } from "../conf";
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nickname: "",
      location: "",
      description: "",
      avatar: "",
      file: null,
      modal: false
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;

    axios.get(`${backend}/modification/${currentUser}`).then(({ data }) => {
      this.setState({
        id: data.id,
        nickname: data.nickname,
        location: data.location,
        description: data.description,
        avatar: data.avatar
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
      .put(`${backend}/modification/${currentUser}`, {
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

  toggleModalAvatar() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAvatar(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    return axios
      .post(`${backend}/uploadAvatar/${currentUser}`, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response.data);
      });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const nickname = this.state.nickname;
    const location = this.state.location;
    const description = this.state.description;
    const avatar = this.state.avatar;
    return (
      <React.Fragment>
        <Form
          onSubmit={event => {
            this.handleSubmit(event);
          }}
        >
          <h1 className="titleConnect">Modifie ton profil !</h1>
          <Row>
            <Col lg="6">
              <Form.Group controlId="nickname">
                <h1 className="titleInput" htmlFor="nickname">
                  Nom d'utilisateur *
                </h1>
                <Form.Control
                  tabIndex="1"
                  autoFocus
                  type="text"
                  value={nickname}
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
            <Col lg="6">
              <Form.Group controlId="location">
                <h1 className="titleInput" htmlFor="location">
                  Ville
                </h1>
                <Form.Control
                  tabIndex="2"
                  type="text"
                  value={location}
                  maxLength="255"
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <Form.Group controlId="avatar">
                <h1 className="titleInput">Avatar</h1>
              </Form.Group>
              <img
                src={avatar}
                alt="avatar"
                className="avatar mx-auto"
                onClick={() => {
                  this.toggleModalAvatar();
                }}
              />
              <Modal
                isOpen={this.state.modal}
                toggle={() => {
                  this.toggleModalAvatar();
                }}
              >
                <ModalHeader
                  toggle={() => {
                    this.toggleModalAvatar();
                  }}
                />
                <Form
                  onSubmit={e => {
                    this.handleAvatar(e);
                  }}
                >
                  <Input
                    type="file"
                    name="avatar"
                    onChange={e => {
                      this.onChange(e);
                    }}
                  />
                  <Button type="submit">Envoyer</Button>
                </Form>
              </Modal>
            </Col>
            <Col>
              <Form.Group controlId="description">
                <h1 className="titleInput" htmlFor="description">
                  Description
                </h1>
                <Form.Control
                  tabIndex="3"
                  as="textarea"
                  rows="5"
                  type="text"
                  value={description}
                  maxLength="255"
                  onChange={event => {
                    this.handleChange(event);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <h1 className="titleInput" htmlFor="description">
            * Champ obligatoire
          </h1>
          <Button
            style={{ border: "1px solid black" }}
            className="myButton"
            block
            disabled={!this.validateForm()}
            type="submit"
            tabIndex="4"
          >
            Valider
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default EditProfile;
