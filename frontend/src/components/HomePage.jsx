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
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5050/articles/`, {
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
<<<<<<< HEAD
              <Col sm="6" md="4" lg="3" key={key} className="picture-frame">
                <Photo
                  picture={picture.url}
                  link={picture.id_clothing}
                  pictureId={picture.id}
=======
              <Col sm="6" md="4" lg="3" key={key}>
                <Photo
                  picture={picture.url}
                  pictureId={picture.id}
                  link={picture.id_clothing}
>>>>>>> d00afb8de5d0a94a02ec0f5d1a3946de6f320d51
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
