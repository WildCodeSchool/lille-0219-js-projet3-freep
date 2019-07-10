import React from "react";
import ImageUploader from "react-images-upload";
import "../style/Upload.scss";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";
import axios from "axios";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [], uploadArray: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(`http://localhost:5050/${currentUser}/uploadPicture`)
      .then(() => {
        alert("Votre photo a bien été envoyée");
      });
  }

  render() {
    return (
      <React.Fragment>
        <Form
          className="d-flex flex-column mt-5"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          encType="multipart/form-data"
        >
          <Row className="uploader-container">
            <Col md="4" className="text-center">
              <h2>Prête ton vêtement !</h2>
              <ImageUploader
                className="my-5"
                withIcon={true}
                buttonText="Choisir l'image"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".jpeg"]}
                maxFileSize={5242880}
                withPreview={true}
                label="Max 5Mo | extensions : .jpg .jpeg "
                labelClass="mb-4"
                buttonClassName="image-upload-button"
                name="pictureClotheUpload"
              />
            </Col>
            <Col md="7" className="offset-1">
              <h2>Décris-nous ta tenue !</h2>

              <FormGroup row>
                <Label for="clothing_title" sm={2}>
                  Type
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="type"
                    id="clothing-title"
                    placeholder="Veste ? Pantalon ?"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="brand" sm={2}>
                  Marque
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Zara ? Le comptoir des cotonniers ?"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="size" sm={2}>
                  Taille
                </Label>
                <Col sm={10}>
                  <CustomInput type="select" name="size" id="size">
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>XXXL+</option>
                  </CustomInput>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Plus on a de détails, plus on aime !"
                  />
                </Col>
              </FormGroup>
              <FormGroup check>
                <Label check className="offset-2">
                  <Input type="checkbox" name="deposit" />
                  <p className="pt-2 pl-2">
                    Tu préfères demander une caution ?
                  </p>
                </Label>
              </FormGroup>
              <Button className="col-4 my-3 align-self-center" type="submit">
                Envoyer
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
export default Uploader;
