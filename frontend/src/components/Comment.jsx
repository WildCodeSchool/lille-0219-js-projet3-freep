import React from "react";
import "../style/Comment.scss";
import ReportButton from "./ReportButton";
import { Row, Col } from "reactstrap";
import axios from "axios";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInfo: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5050/comments`).then(({ data }) => {
      this.setState({
        commentInfo: data
      });
    });
  }

  render() {
    const comments = this.state.commentInfo;
    const profile = this.props.info;
    return (
      <React.Fragment>
        {comments.map((comment, key) => {
          return (
            <Row className="px-3 py-1">
              <Col xs="2">
                <img
                  src={profile.avatar}
                  alt={`user-${profile.id}`}
                  className="avatar"
                />
              </Col>
              <Col xs="2">{profile.nickname}</Col>
              <Col xs="6" key={key}>
                {comment.content}
              </Col>
              <Col xs="1">
                <ReportButton />
              </Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Comment;
