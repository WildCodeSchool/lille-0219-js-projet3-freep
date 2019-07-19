import React from "react";
import "../style/Upload.scss";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";
import { backend } from "../conf";

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
      });
  }

  onChangePictures(e) {
    this.setState({ picture: e.target.files[0] });
  }

  render() {
    return (
      <React.Fragment>
        <Form
          className="d-flex flex-column mt-5"
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
          <Button className="col-4 my-3 align-self-center" type="submit">
            Envoyer
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
export default UploadClothePictures;
