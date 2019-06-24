import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";

const Comment = props => {
  return (
    <Row className="px-3 py-1 align-items-center">
      <Col xs="2">
        <img
          src={props.profile.avatar}
          alt={`user-${props.profile.id}`}
          className="avatar"
          width="20"
        />
      </Col>
      <Col
        xs="2"
        className="align-content-center profile-name comments-profile"
      >
        {props.profile.nickname}
      </Col>
      <Col xs="6" className="align-items-center">
        {props.comment.content}
      </Col>
      <Col xs="1" className="align-items-center">
        <ReportButton />
      </Col>
    </Row>
  );
};

export default Comment;
