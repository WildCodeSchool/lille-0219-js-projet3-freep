import React from "react";
import { Heart, Target, MoreHorizontal } from "react-feather";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

class Photo extends React.Component {
  render() {
    return (
      <div>
        <Link to="/article/:id">
          <img src="https://via.placeholder.com/150" alt="clothes" />
        </Link>
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
