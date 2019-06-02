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
      profileInfo: {
        id: 1,
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        username: "Jade",
        comment: "Super joli! J'aime beaucoup ce style"
      }
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
                <div className="p-4 comments-feed">
                  <div className="m-3">
                    <Row className="align-items-center">
                      <Col xs="4">
                        <img
                          src={this.state.profileInfo.avatar}
                          alt={`user-${this.state.profileInfo.id}`}
                          className="avatar"
                        />
                      </Col>
                      <Col xs="8" className="text-left">
                        {this.state.profileInfo.username}
                      </Col>
                    </Row>
                  </div>
                  <div className="text-left">
                    Petite tenue pour cet hiver. Jupe et pull dispo. Les
                    collants: du basique noir.
                  </div>
                  <ul className="text-left list-unstyled list-inline">
                    <li className="list-inline-item">#jupe</li>
                    <li className="list-inline-item">#casual</li>
                    <li className="list-inline-item">#winteriscoming</li>
                  </ul>
                </div>
                <h2>{this.state.commentsNumber} Commentaires</h2>
                <div className="comments-feed">
                  {/*map comments here */}
                  <Comment info={this.state.profileInfo} />
                  <Comment info={this.state.profileInfo} />
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
