import React from "react";
import { Col } from "reactstrap";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";
import Masonry from "react-masonry-component";

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
    axios.get(`http://localhost:5050/articles/`).then(({ data }) => {
      this.setState({
        picturesInfo: data,
        loading: false
      });
    });

    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios.get(`http://localhost:5050/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data
      });
    });
  }

  render() {
    const pictures = this.state.picturesInfo;
    localStorage.getItem("user");
    const picturesLiked = this.state.picturesLiked;
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Masonry>
          {pictures.map((picture, key) => {
            const liked =
              picturesLiked && picturesLiked.indexOf(picture.id) !== -1
                ? true
                : false;
            return (
              <Col sm="6" md="4" lg="3" key={key}>
                <Photo
                  picture={picture.url}
                  pictureId={picture.id}
                  link={picture.id_clothing}
                  isLiked={liked}
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
