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
      isLiked: false,
      picturesLiked: null
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios.get(`${backend}/deposit/`).then(({ data }) => {
      this.setState({
        deposit: data.deposit
      });
    });
    axios.get(`${backend}/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data,
        isLiked: data.indexOf(this.props.pictureId) !== -1
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
    axios.get(`${backend}/like/${currentUser}`).then(({ data }) => {
      this.setState({
        picturesLiked: data
      });
    });
  };

  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    const deposit = this.state.deposit;
    const dep = deposit && deposit.indexOf(link) !== -1 ? false : true;
    return (
      <Card className="m-2 picture-card">
        <Link to={`/article/${link}`}>
          <CardImg src={picture} alt="clothes" className="Photo" />
        </Link>
        <div className="overlay">
          <Row className="p-0 card-buttons align-items-center">
            <Heart
              width="19"
              onClick={this.handleClick}
              className={this.state.isLiked ? "liked" : "notLiked"}
            />
            <div className={dep ? "deposit" : "no-deposit"}>ℂ</div>
            <ReportButton link={link} />
          </Row>
        </div>
      </Card>
    );
  }
}

export default Photo;
