import React from "react";
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
import { backend } from "../conf";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      brand: null,
      size: null,
      description: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let { type, brand, size, description } = this.state;

    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(`${backend}/uploadClothe/${currentUser}`, {
        type: type,
        brand: brand,
        size: size,
        description: description
      })
      .then(({ data }) => {
        this.setState({
          type: data.type,
          brand: data.brand,
          size: data.size,
          description: data.description
        });
        this.props.history.push("/uploadclothepicture");
      });
  }

  onChangeFields(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  // onChangeChecked(e) {
  //   this.setState({
  //     deposit: e.event.checked
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <Form
          className="d-flex flex-column mt-5"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <Row className="uploader-container">
            <Col md="7" className="offset-1">
              <h2>Décris-nous ta tenue !</h2>

              <FormGroup row>
                <Label htmlFor="type" sm={2}>
                  Type
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="type"
                    id="type"
                    value={this.state.type}
                    placeholder="Veste ? Pantalon ?"
                    onChange={e => {
                      this.onChangeFields(e);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="brand" sm={2}>
                  Marque
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="brand"
                    id="brand"
                    value={this.state.brand}
                    placeholder="Zara ? Le comptoir des cotonniers ?"
                    onChange={e => {
                      this.onChangeFields(e);
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="size" sm={2}>
                  Taille
                </Label>
                <Col sm={10}>
                  <CustomInput
                    type="select"
                    name="size"
                    id="size"
                    onChange={e => {
                      this.onChangeFields(e);
                    }}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL+">XXXL+</option>
                  </CustomInput>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="description" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.description}
                    placeholder="Plus on a de détails, plus on aime !"
                    onChange={e => {
                      this.onChangeFields(e);
                    }}
                  />
                </Col>
              </FormGroup>
              {/* <FormGroup check>
                <Label check className="offset-2">
                  <Input
                    type="checkbox"
                    name="deposit"
                    id="deposit"
                    onChange={() => {
                      this.onChangeChecked();
                    }}
                  />
                  <p className="pt-2 pl-2">
                    Tu préfères demander une caution ?
                  </p>
                </Label>
              </FormGroup> */}
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
