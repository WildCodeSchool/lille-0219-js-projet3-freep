import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Comment = props => {
  const link = props.comment.id_clothing;
  return (
    <Row className="px-3 py-1 my-2 align-items-center">
      <Link to={`/profil/${props.profile.id}`}>
        <Col md="2" xs="1">
          <img
            src={props.profile.avatar}
            alt={`user-${props.profile.id}`}
            className="comment-avatar"
          />
        </Col>
      </Link>
      <Col
        md="2"
        xs="1"
        className="align-content-center profile-name comments-profile m-0"
      >
        {props.profile.nickname}
      </Col>
      <Col xs="5" md="5" className="align-items-center comment">
        <p className="text-muted font-italic m-0">{props.timeStamp}</p>
        {props.comment.content}
      </Col>
      <Col xs="1" className="align-items-left">
        <ReportButton link={link} />
      </Col>
    </Row>
  );
};

export default Comment;
