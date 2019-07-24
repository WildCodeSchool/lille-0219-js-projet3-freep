import React from "react";
import "../style/Upload.scss";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";
import { backend } from "../conf";
import { UploadCloud } from "react-feather";

class UploadClothePictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null
    };
  }

  handleSubmitPictures(e) {
    e.preventDefault();
    this.picturesUpload(this.state.picture);
  }

  picturesUpload(file) {
    const formData = new FormData();
    formData.append("clothePicture", file);
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    return axios
      .post(`${backend}/uploadClothePictures/${currentUser}`, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("./accueil");
      });
  }

  onChangePictures(e) {
    this.setState({ picture: e.target.files[0] });
  }

  validateForm() {
    return this.state.file !== null;
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div className="d-flex proofPics-modal justify-content-center align-items-center">
            <Form
              className="d-flex flex-column mt-5 justify-content-center"
              onSubmit={e => {
                this.handleSubmitPictures(e);
              }}
            >
              <h2>Envoie tes photos !</h2>
              <Input
                type="file"
                name="clothePicture"
                onChange={e => {
                  this.onChangePictures(e);
                }}
              />
              <UploadCloud />
              <Button
                type="submit"
                onClick={() => {
                  this.toggleModalBorrow();
                }}
                className="upload-btn col-4 my-3 align-self-center"
                disabled={!this.validateForm()}
              >
                Envoyer
              </Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UploadClothePictures;
