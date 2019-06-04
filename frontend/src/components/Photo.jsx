import React from "react";
import { Heart, Target, MoreHorizontal } from "react-feather";
import { Row, Col } from "reactstrap";

class Photo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src="https://via.placeholder.com/150" alt="clothes' picture" />
        <Row>
          <Heart />
          <Target />
          <MoreHorizontal />
        </Row>
      </React.Fragment>
    );
  }
}

export default Photo;
