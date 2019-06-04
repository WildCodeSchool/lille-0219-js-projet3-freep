import React from "react";
import { Row, Col } from "reactstrap";
import Photo from "./Photo";

class HomePage extends React.Component {
  render() {
    return (
      <Row>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
        <Col sm="6" md="4" lg="3">
          <Photo />
        </Col>
      </Row>
    );
  }
}

export default HomePage;
