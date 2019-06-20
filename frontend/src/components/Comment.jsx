import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";

class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    const profile = this.props.profile;
    return (
      <Row className="px-3 py-1 align-items-center">
        <Col xs="2">
          <img
            src={profile.avatar}
            alt={`user-${profile.id}`}
            className="avatar"
          />
        </Col>
        <Col
          xs="2"
          className="align-content-center profile-name comments-profile"
        >
          {profile.nickname}
        </Col>
        <Col xs="6" className="align-items-center">
          {comment.content}
        </Col>
        <Col xs="1" className="align-items-center">
          <ReportButton />
        </Col>
      </Row>
    );
  }
}

export default Comment;
