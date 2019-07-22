import React from "react";
import { Col } from "reactstrap";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";
import Masonry from "react-masonry-component";
import { backend } from "../conf";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      picturesInfo: [],
      picturesLiked: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`${backend}/articles/`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(({ data }) => {
        this.setState({
          picturesInfo: data,
          loading: false
        });
      });
  }

  render() {
    const pictures = this.state.picturesInfo;
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Masonry>
          {pictures.map((picture, key) => {
            return (
              <Col sm="6" md="4" lg="3" key={key} className="picture-frame">
                <Photo
                  picture={picture.url}
                  link={picture.id_clothing}
                  pictureId={picture.id}
                />
              </Col>
            );
          })}
        </Masonry>
      );
    }
  }
}

export default HomePage;
