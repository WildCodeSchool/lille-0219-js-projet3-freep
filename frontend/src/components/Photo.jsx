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
      isLiked: "0"
    };
  }

  componentDidMount() {
    //   axios
    //     .delete(`http://localhost:5050/social/${pictureId}`)
    //     .then(({ data }) => {
    //       this.setState({
    //         isLiked: data
    //       });
    //     });
    // }
    // like(e) {
    //   axios.post(`http://localhost:5050/social/${pictureId}`).then(({ data }) => {
    //     this.setState({
    //       isLiked: data
    //     });
    //   });
  }

  render() {
    const picture = this.props.picture;
    const link = this.props.link;

    return (
      <React.Fragment>
        <Card>
          <Link to={`/article/${link}`}>
            <CardImg src={picture.url} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              <Heart
                color="white"
                onClick={e => this.like(this.props.pictureId)}
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
