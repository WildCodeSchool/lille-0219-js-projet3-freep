import React from "react";
import { Heart, Target } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";

class Photo extends React.Component {
  render() {
    const picture = this.props.picture;
    return (
      <React.Fragment>
        <Card>
          <Link to="/article/1">
            <CardImg src={picture} alt="clothes" className="Photo" />
          </Link>
          <div className="overlay">
            <Row className="p-0 card-buttons align-items-center">
              <Heart color="white" />
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
