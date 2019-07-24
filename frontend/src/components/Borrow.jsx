//composant pour 1 emprunt
import React from "react";
import {
  Col,
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
import { backend } from "../conf";
import { Camera, Trash2, UploadCloud } from "react-feather";

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
      .post(`${backend}/uploadProof/${currentUser}/${clothingId}`, formData, {
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

  validateForm() {
    return this.state.file !== null;
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
                  title="J'ai emprunté ce vêtement, j'envoie une photo de ma tenue !"
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
                    Envoie ta photo, récompense la Freepeuse !
                  </ModalHeader>
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
                    <UploadCloud />
                    <Button
                      type="submit"
                      onClick={() => {
                        this.toggleModalBorrow();
                      }}
                      className="upload-btn"
                      disabled={!this.validateForm()}
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
                  title="Je veux annuler cet emprunt"
                >
                  <Trash2 width="22px" />
                </Button>
              </Col>
            </footer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Borrow;
