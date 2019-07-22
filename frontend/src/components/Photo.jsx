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
  }

  render() {
    const picture = this.props.picture;
    const link = this.props.link;
    const deposit = this.state.deposit;
    const dep = deposit && deposit.indexOf(link) !== -1 ? false : true;
    const liked = this.props.liked;
    return (
      <Card className="m-2 picture-card">
        <Link to={`/article/${link}`}>
          <CardImg src={picture} alt="clothes" className="Photo" />
        </Link>
        <div className="overlay">
          <Row className="p-0 card-buttons align-items-center">
            <Heart
              width="19"
              className={liked ? "liked" : "notLiked"}
              onClick={this.props.handleClick}
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
