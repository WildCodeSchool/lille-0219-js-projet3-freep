import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../style/Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="text-center">
            <Col md="3" className="text-center mx-auto">
              <img
                src="https://randomuser.me/api/portraits/men/25.jpg"
                className="avatar m-3"
              />
            </Col>
            <Col md="3">
              <Col className="h-50">✮✮✮✮✮</Col>
              <Col className="h-50 dancingscript">Clarisse Noulé</Col>
            </Col>
            <Col className="text-left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
              accusantium commodi voluptatibus, nihil asperiores quis blanditiis
              obcaecati itaque esse error at ea enim ipsam recusandae aliquam
              iure voluptate libero corporis!
            </Col>
          </Row>
          <Row className="text-center">
            <Col sm="4" md="2" className="dancingscript">
              127 Followers
            </Col>
            <Col sm="4" md="2" className="dancingscript">
              31 Following
            </Col>
            <Col sm="4" md="2" className="dancingscript">
              10 Posts
            </Col>
            <Col sm="6" md="3">
              <Button className="button shadow-sm px-5 dancingscript">Éditer</Button>
            </Col>
            <Col sm="6" md="3">
              <Button className="button shadow-sm px-5 dancingscript">Message</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
