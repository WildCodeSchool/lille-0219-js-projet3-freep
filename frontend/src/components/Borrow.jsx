//composant pour 1 emprunt
import React from "react";
import {
  Col,
  Card,
  CardBody,
  CardImg,
  CardFooter,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Borrow.scss";
import { backend } from "../conf";

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      file: null,
      modal: false,
      isOpen: false
    };
  }

  handleDelete(e) {
    e.preventDefault();
    const borrowId = this.props.borrowId;
    axios.delete(`${backend}/emprunt/${borrowId}`).then(() => {
      this.setState({
        hidden: true
      });
    });
  }

  toggleModalBorrow() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fileUpload(this.state.file);
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append("proof", file);
    const clothingId = this.props.clothePage;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    return axios
      .post(`${backend}/${currentUser}/${clothingId}`, formData, {
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
    return (
      <div className={this.state.hidden ? "hidden" : ""}>
        <Card className="borrowCard">
          <CardBody>
            <Link to={`/article/${this.props.clothePage}`} className="link">
              <CardImg
                src={this.props.pictureUrl}
                alt="borrowClothe"
                className="borrowPicture"
              />
            </Link>
            <CardFooter className="row justify-content-center px-0 py-2 mx-auto">
              <Col xs="5" className="m-1 p-0 d-flex justify-content-center">
                <Button
                  onClick={() => {
                    this.toggleModalBorrow();
                  }}
                  className="borrowButton"
                >
                  J'ai emprunté ce vêtement
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={() => {
                    this.toggleModalBorrow();
                  }}
                >
                  <ModalHeader
                    toggle={() => {
                      this.toggleModalBorrow();
                    }}
                  />
                  <Form
                    onSubmit={e => {
                      this.handleSubmit(e);
                    }}
                  >
                    <Input
                      type="file"
                      name="proof"
                      onChange={e => {
                        this.onChange(e);
                      }}
                    />
                    <Button
                      type="submit"
                      onClick={() => {
                        this.toggleModalBorrow();
                      }}
                    >
                      Envoyer
                    </Button>
                  </Form>
                </Modal>
              </Col>
              <Col xs="5" className="m-1 p-0 d-flex justify-content-center">
                <Button
                  onClick={e => {
                    this.handleDelete(e);
                  }}
                  className="borrowButton"
                >
                  Annuler l'emprunt
                </Button>
              </Col>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Borrow;
