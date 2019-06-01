import React from "react";
import { Row, Col } from "reactstrap";
import "../style/Comment.scss";

class Comment extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="comment-line mx-1 my-2">
          <Col xs="2">
            <img
              src={this.props.avatar}
              alt="username-goes-here" // !
              className="avatar"
            />
          </Col>
          <Col xs="2">{this.props.username}</Col>
          <Col xs="7" className="text-left">
            {this.props.comment}
          </Col>
          <Col xs="1">
            <button onClick="">...</button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Comment;
