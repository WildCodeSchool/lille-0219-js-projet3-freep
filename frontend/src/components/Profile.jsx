import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../style/Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="text-center align-items-center">
            <Col md="3" className="text-center mx-auto">
              <img
                src="https://randomuser.me/api/portraits/women/10.jpg"
                className="avatar m-3"
                alt="Avatar"
              />
            </Col>
            <Col md="3">
              <Col>✮✮✮<span className="starsgrey">✮✮</span></Col>
              <Col className="dancingscript">Loren Ipsum</Col>
            </Col>
            <Col className="text-justify amatic p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ullam quos dignissimos eveniet nesciunt illo, adipisci, modi quidem assumenda ipsam tempore minus dolore ea quam deleniti itaque necessitatibus reprehenderit cum!
            </Col>
          </Row>
          <Row className="text-center">
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              127 Followers
            </Col>
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              31 Following
            </Col>
            <Col sm="12" md="4" xl="2" className="dancingscript py-3">
              10 Posts
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Éditer</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Message</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
