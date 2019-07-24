import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Comment = props => {
  const link = props.comment.id_clothing;
  const profile = props.profile;
  return (
    <Row className="px-3 py-1 my-2 align-items-center">
      <Link to={`/profil/${profile.id}`}>
        <Col md="2" xs="1">
          <img
            src={profile.avatar}
            alt={`user-${profile.id}`}
            className="comment-avatar"
          />
        </Col>
      </Link>
      <Col
        xs="2"
        className="align-content-center profile-name comments-profile m-0 p-0"
      >
        {profile.nickname}
      </Col>
      <Col xs="6" className="align-items-center comment p-0 m-0">
        <p className="text-muted font-italic m-0">{props.timeStamp}</p>
        {props.comment.content}
      </Col>
      <Col xs="1" className="align-items-left p-0">
        <ReportButton link={link} />
      </Col>
    </Row>
  );
};

export default Comment;
