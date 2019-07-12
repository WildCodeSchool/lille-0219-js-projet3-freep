import React from "react";
import "../style/Upload.scss";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";

class UploadClothePictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    };
  }

  handleSubmitPictures(e) {
    e.preventDefault();
    this.picturesUpload(this.state.pictures);
  }

  picturesUpload(files) {
    const formData = new FormData();
    formData.append("clothePicture", files);
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    return axios
      .post(
        `http://localhost:5050/uploadClothePictures/${currentUser}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.props.toggleModalPicture();
      });
  }

  onChangePictures(e) {
    this.setState({ pictures: e.target.files });
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
          <h2>Prête ton vêtement !</h2>
          <Input
            type="file"
            name="clothePicture"
            multiple
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
