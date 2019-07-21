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
import { Camera, Trash2, UploadCloud } from "react-feather";

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
    const clothingId = this.props.clothePage;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(`${backend}/${currentUser}/${clothingId}/uploadProof`)
      .then(() => {
        alert("Votre photo a bien été envoyée");
      });
  }

  render() {
    return (
      <div className={this.state.hidden ? "hidden" : "borrow-card-parent"}>
        <Card className="borrowCard my-3">
          <CardBody>
            <Link to={`/article/${this.props.clothePage}`} className="link">
              <CardImg
                src={this.props.pictureUrl}
                alt="borrowClothe"
                className="borrowPicture"
              />
            </Link>
            <footer className="row btn-footer">
              <Col xs="5" className="m-1 p-0 d-flex justify-content-center">
                <Button
                  onClick={() => {
                    this.toggleModalBorrow();
                  }}
                  className="borrowButton"
                  title="J'ai emprunté ce vêtement, j'envoie une photo et je gagne 1 point !"
                >
                  <Camera width="22px" />
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={() => {
                    this.toggleModalBorrow();
                  }}
                  className="proofPics-modal"
                >
                  <ModalHeader
                    toggle={() => {
                      this.toggleModalBorrow();
                    }}
                    className="d-flex align-items-center"
                  >
                    Envoie ta photo, gagne 1 point !
                  </ModalHeader>
                  <Form
                    onSubmit={e => {
                      this.handleSubmit(e);
                    }}
                    encType="multipart/form-data"
                  >
                    <div className="input-box border">
                      <Input type="file" name="myFile" />
                      <UploadCloud />
                    </div>
                    <Button type="submit" className="upload-btn m-auto">
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
                  title="Je veux annuler cet emprunt"
                >
                  <Trash2 width="22px" />
                </Button>
              </Col>
            </footer>
            {/* <CardFooter className="row justify-content-center px-0 py-2 mx-auto" /> */}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Borrow;
