import React from "react";
import { Heart, Target, MoreHorizontal } from "react-feather";
import { Row } from "reactstrap";

class Photo extends React.Component {
  render() {
    return (
      <div>
        <img src="https://via.placeholder.com/150" alt="clothes" />
        <Row>
          <Heart />
          <Target />
          <MoreHorizontal />
        </Row>
      </div>
    );
  }
}

export default Photo;
