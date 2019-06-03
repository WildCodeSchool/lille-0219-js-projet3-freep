import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";

class Comment extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <React.Fragment>
        <Row className="comment-line mx-1 my-2">
          <Col xs="2">
            <img src={info.avatar} alt={`user-${info.id}`} className="avatar" />
          </Col>
          <Col xs="2">{info.username}</Col>
          <Col xs="7" className="text-left">
            {info.comment}
          </Col>
          <Col xs="1" className="p-0">
            <ReportButton />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Comment;
