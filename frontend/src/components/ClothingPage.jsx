import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../style/ClothingPage.scss";
// import Profile from "./Profile";
import Comment from "./Comment";

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsNumber: 35,
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      username: "Jade",
      comment: "Super joli! Lorem ipsum dolor sit amet consectblablabla"
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container className="clothing-container">
          <Row>
            <Col lg="7" />
            <Col lg="5" className="comments-container text-center">
              <div className="sub-container">
                {/* <Profile /> */}
                <div className="fake-profile">Fake Profile</div>
                <h2>{this.state.commentsNumber} Commentaires</h2>
                <div className="comments-feed">
                  {/*map comments here */}
                  <Comment
                    avatar={this.state.avatar}
                    username={this.state.username}
                    comment={this.state.comment}
                  />
                  <Comment
                    avatar={this.state.avatar}
                    username={this.state.username}
                    comment={this.state.comment}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ClothingPage;
