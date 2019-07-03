import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";

const Comment = props => {
  return (
    <Row className="px-3 py-1 my-2 align-items-center">
      <Col md="2" xs="1">
        <img
          src={props.profile.avatar}
          alt={`user-${props.profile.id}`}
          className="comment-avatar"
        />
      </Col>
      <Col
        md="2"
        xs="1"
        className="align-content-center profile-name comments-profile"
      >
        {props.profile.nickname}
      </Col>
      <Col xs="5" md="5" className="align-items-center comment">
        <p className="text-muted m-0">{props.comment.created_at}</p>
        {props.comment.content}
      </Col>
      <Col xs="1" className="align-items-left">
        <ReportButton />
      </Col>
    </Row>
  );
};

export default Comment;
