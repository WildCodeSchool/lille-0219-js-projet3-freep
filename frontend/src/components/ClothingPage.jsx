import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../style/ClothingPage.scss";
// import Profile from "./Profile";

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsNumber: 35
    };
  }
  render() {
    return (
      <React.Fragment>
        <Container className="clothing-container">
          <Row>
            <Col lg="7" />
            <Col lg="5" className="comments-container border text-center">
              <div className="sub-container">
                {/* <Profile /> */}
                <div className="fake-profile">Fake Profile</div>
                <h2>{this.state.commentsNumber} Commentaires</h2>
                <div className="comments-feed" />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ClothingPage;
