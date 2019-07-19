import React from "react";
import { Heart } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";
import axios from "axios";
import { backend } from "../conf";

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: null,
      isLiked: null,
      picturesLiked: null
    };
  }

  componentDidMount() {
    axios.get(`${backend}/deposit/`).then(({ data }) => {
      this.setState({
        deposit: data.deposit
      });
    });

    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .get(`${backend}/like/${currentUser}`)
      .then(({ data }) => {
        this.setState({
          picturesLiked: data
        });
      });
  }

  handleClick = () => {
    const pictureId = this.props.pictureId;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    if (!this.state.isLiked) {
      axios
        .post(`${backend}/like/${pictureId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          this.setState({
            isLiked: true
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
  };

  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    const deposit = this.state.deposit;
    const dep = deposit && deposit.indexOf(link) !== -1 ? false : true;
    const picturesLiked = this.state.picturesLiked;
    const pictureId = this.props.pictureId;
    const liked =
      picturesLiked && picturesLiked.indexOf(pictureId) !== -1 ? true : false;

    return (
      <Card className="m-2 picture-card">
        <Link to={`/article/${link}`}>
          <CardImg
            src={picture}
            style={{ minHeight: "180px" }}
            alt="clothes"
            className="Photo"
          />
        </Link>
        <div className="overlay">
          <Row className="p-0 card-buttons align-items-center">
            <Heart
              width="19"
              onClick={this.handleClick}
              className={liked ? "liked" : "notLiked"}
            />
            <div className={dep ? "deposit" : "no-deposit"}>ℂ</div>
            <ReportButton />
          </Row>
        </div>
      </Card>
    );
  }
}

export default Photo;
