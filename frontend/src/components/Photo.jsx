import React from "react";
import { Heart, Target } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";
import axios from "axios";

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picturesLiked: ""
    };
  }

  componentDidMount() {
    const pictureId = this.props.pictureId;

    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    // const choupette = JSON.stringify(currentUser);
    // const currentLikes = JSON.parse(localStorage.getItem("likes"));
    localStorage.getItem("user");

    axios.get(`http://localhost:5050/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data,
        loading: false
      });
      const likes = data.map(like => {
        return like.id_content;
      });
      console.log(likes);
      localStorage.setItem("likes", likes);
      // for (let i = 0; i <= pictureId.length; i++) {
      //   let id_picture;
      //   if (pictureId === likes[i]) {
      // this.setState({
      //   isLiked: true
      // });
      // }
      // }
    });
  }

  handleClick = () => {
    const pictureId = this.props.pictureId;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;

    if (!this.state.isLiked) {
      axios
        .post(`http://localhost:5050/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          this.setState({
            likes: data
          });
          localStorage.setItem("likes", JSON.stringify(data));
        });
    } else {
      axios
        .put(`http://localhost:5050/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          this.setState({
            likes: data
          });
        });
    }
  };

  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    const picturesLiked = this.state.picturesLiked;
    return (
      <React.Fragment>
        <Card className="m-2">
          <Link to={`/article/${link}`}>
            <CardImg src={picture} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              {picturesLiked === this.likes ? (
                <Heart onClick={this.handleClick} color="white" />
              ) : (
                <Heart onClick={this.handleClick} fill="pink" color="none" />
              )}
              <Target color="white" />
              <ReportButton />
            </Row>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default Photo;
