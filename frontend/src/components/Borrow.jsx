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
      hidden: false,
      modal: false,
      isOpen: false
    };
  }

  handleDelete(e) {
    e.preventDefault();
    const borrowId = this.props.borrowId;
    axios.delete(`http://localhost:5050/emprunt/${borrowId}`).then(() => {
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

            <Button
              onClick={() => {
                this.toggleModalBorrow();
              }}
              className="borrowButton"
            >
              J'ai emprunté ce vêtement
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModalBorrow}>
              <ModalHeader toggle={this.toggleModalBorrow} />
              <Form
                method="POST"
                enctype="multipart/form-data"
                action="uploaddufichier"
              >
                <Input type="file" name="monfichier" />
                <Button>Envoyer</Button>
              </Form>
            </Modal>
            <Button
              onClick={e => {
                this.handleDelete(e);
              }}
              className="borrowButton"
            >
              Annuler l'emprunt
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Borrow;
