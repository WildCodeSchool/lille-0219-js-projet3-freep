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
    // const pictureId = this.props.pictureId;
    // const pictures = this.props.pictures;
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
    const isLiked = this.props.isLiked;
    return (
      <React.Fragment>
        <Card className="m-2">
          <Link to={`/article/${link}`}>
            <CardImg src={picture} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              <Heart
                onClick={this.handleClick}
                className={isLiked ? "liked" : "notLiked"}
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
