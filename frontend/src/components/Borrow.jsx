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
      modal: false,
      isOpen: false
    };
  }

  handleDelete(e) {
    e.preventDefault();
    const borrowId = this.props.borrowId;
    axios
      .delete(`https://backend.freep-app.fr/emprunt/${borrowId}`)
      .then(() => {
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
    const clothingId = this.props.clothePage;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(
        `https://backend.freep-app.fr/${currentUser}/${clothingId}/uploadProof`
      )
      .then(() => {
        alert("Votre photo a bien été envoyée");
      });
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
                    encType="multipart/form-data"
                  >
                    <Input type="file" name="myFile" />
                    <Button type="submit">Envoyer</Button>
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
