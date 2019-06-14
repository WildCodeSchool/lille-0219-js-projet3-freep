import React from "react";
import { Heart, Target } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";

class Photo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <Link to="/article/1">
            <CardImg
              src="http://static.wixstatic.com/media/a87a8e_973910fcfb134c43a01f610f9413f529.jpg"
              alt="clothes"
              className="Photo"
            />
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
