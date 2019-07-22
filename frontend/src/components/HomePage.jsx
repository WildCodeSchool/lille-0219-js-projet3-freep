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
      picturesLiked: [],
      isLiked: false
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

    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios.get(`${backend}/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data
      });
    });
  }

  handleClick(pictureId) {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    if (!this.state.isLiked) {
      axios
        .post(`${backend}/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          const likedPics = this.state.picturesLiked;
          likedPics.unshift(data);
          this.setState({
            isLiked: true,
            picturesLiked: likedPics
          });
        });
    } else {
      axios
        .put(`${backend}/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          this.setState({
            isLiked: false
          });
        });
    }
  }

  render() {
    const pictures = this.state.picturesInfo;
    const picLiked = this.state.picturesLiked;
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Masonry>
          {pictures.map((picture, key) => {
            const liked =
              picLiked && picLiked.indexOf(picture.id) !== -1 ? true : false;
            return (
              <Col sm="6" md="4" lg="3" key={key} className="picture-frame">
                <Photo
                  picture={picture.url}
                  link={picture.id_clothing}
                  pictureId={picture.id}
                  handleClick={pictureId => this.handleClick(picture.id)}
                  liked={liked}
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
