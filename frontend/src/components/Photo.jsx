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
      isLiked: null,
      picturesLiked: null,
      likes: null
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    const picturesLiked = JSON.parse(localStorage.getItem("pictures"));
    axios.get(`http://localhost:5050/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data
      });
      localStorage.setItem(
        "pictures",
        JSON.stringify(this.state.picturesLiked)
      );
    });
    for (let i = 0; i <= picturesLiked.length; i++) {
      if (currentUser === picturesLiked[i]) {
        this.setState({
          isLiked: true
        });
      }
    }
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
            isLiked: true
          });
        });
    } else {
      axios
        .put(`http://localhost:5050/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          this.setState({
            isLiked: false
          });
        });
    }
  };

  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    const picturesLiked = this.state.picturesLiked;
    const pictureId = this.props.pictureId;
    const liked =
      picturesLiked && picturesLiked.indexOf(pictureId) !== -1 ? true : false;
    return (
      <React.Fragment>
        <Card className="m-2 picture-card">
          <Link to={`/article/${link}`}>
            <CardImg src={picture} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              <Heart
                onClick={this.handleClick}
                className={liked ? "liked" : "notLiked"}
              />
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
