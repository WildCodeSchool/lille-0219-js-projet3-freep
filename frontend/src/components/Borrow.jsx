//composant pour 1 emprunt
import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Borrow.scss";

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  handleDelete(e) {
    e.preventDefault();
    const userId = this.props.userId;
    const borrowId = this.props.borrowId;
    axios
      .delete(`http://localhost:5050/emprunt/${userId}/${borrowId}`)
      .then(({ data }) => {
        this.setState({
          hidden: true
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const clothingId = this.props.clothePage;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(`http://localhost:5050/${currentUser}/${clothingId}/uploadProof`)
      .then(() => {
        alert("Votre photo a bien été envoyée");
      });
  }

  render() {
    return (
      <div className={this.state.hidden ? "hidden" : ""}>
        <Card>
          <CardBody>
            <Link to={`/article/${this.props.clothePage}`} className="link">
              <CardImg
                src={this.props.pictureUrl}
                alt="borrowClothe"
                className="borrowPicture"
              />
            </Link>
            <Button
              onClick={e => {
                this.handleDelete(e);
              }}
            >
              Annuler l'emprunt
            </Button>

            <Button
              onClick={() => {
                this.props.toggleModalBorrow();
              }}
            >
              J'ai emprunté ce vêtement
            </Button>
            <Modal
              isOpen={this.props.modal}
              toggle={this.props.toggleModalBorrow}
            >
              <ModalHeader
                toggle={this.props.toggleModalBorrow}
                className="pr-5"
              />
              <Form
                onsubmit={e => {
                  this.handleSubmit(e);
                }}
                enctype="multipart/form-data"
              >
                <Input type="file" name="myFile" />
                <Button type="submit">Envoyer</Button>
              </Form>
            </Modal>
            <Form
              onsubmit={e => {
                this.handleSubmit(e);
              }}
              enctype="multipart/form-data"
            >
              <Input type="file" name="myFile" />
              <Button type="submit">Envoyer</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Borrow;
