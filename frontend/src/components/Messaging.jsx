import React from "react";
import { Card, CardBody, CardText, CardImg } from "reactstrap";
import { Row, Col } from "reactstrap";
import Avatar from "../pictures/Avatar.jpg";
import "../style/Messaging.css";

class Messaging extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardImg src={Avatar} alt="Avatar" className="imgAvatar" />
            <Row>
              <CardText>
                <Row>
                  <Col lg="4">
                    <p>FirstName LASTNAME</p>
                  </Col>
                  <Col lg="4">
                    <p>Il y a 5 minutes.</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <p>
                      LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse aliquam facilisis mollis. Ut
                      blandit eget turpis eu placerat. Nam ultrices purus quam,
                      vitae accumsan leo commodo id. Proin non leo quis dui
                      tincidunt porttitor.
                    </p>
                  </Col>
                </Row>
              </CardText>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Messaging;
