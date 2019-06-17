import React from "react";
import { Card, CardBody, CardText, CardImg, Row, Col } from "reactstrap";
import "../style/Messaging.scss";
import Ruby from "../pictures/Ruby.jpg";
import Scarlett from "../pictures/Scarlett.jpg";

class Message extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Row>
              <Col xs="3" sm="3" md="3">
                <CardImg
                  src={Ruby}
                  alt="Avatar"
                  className="imgAvatar rounded-circle"
                />
              </Col>
              <Col xs="9" sm="9" md="9">
                <Row>
                  <CardText className="m-5">
                    <Row className="d-flex">
                      <Col>
                        <p className="name">Ruby Rose</p>
                      </Col>
                      <Col>
                        <p className="messageDate">Il y a 5 minutes.</p>
                      </Col>
                    </Row>
                    <Row>
                      <p className="bodyText text-justify">
                        LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse aliquam facilisis mollis.
                        Ut blandit eget turpis eu placerat. Nam ultrices purus
                        quam, vitae accumsan leo commodo id. Proin non leo quis
                        dui tincidunt porttitor.
                      </p>
                    </Row>
                  </CardText>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <Row>
              <Col xs="9" sm="9" md="9">
                <Row>
                  <CardText className="m-5">
                    <Row className="d-flex">
                      <Col>
                        <p>Il y a 5 minutes.</p>
                      </Col>
                      <Col>
                        <p className="name nameRight">Moi</p>
                      </Col>
                    </Row>
                    <Row>
                      <p className="bodyText text-justify">
                        LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse aliquam facilisis mollis.
                        Ut blandit eget turpis eu placerat. Nam ultrices purus
                        quam, vitae accumsan leo commodo id. Proin non leo quis
                        dui tincidunt porttitor.
                      </p>
                    </Row>
                  </CardText>
                </Row>
              </Col>
              <Col xs="3" sm="3" md="3">
                <CardImg
                  src={Scarlett}
                  alt="Avatar"
                  className="imgAvatar rounded-circle"
                />
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <Row>
              <Col xs="3" sm="3" md="3">
                <CardImg
                  src={Ruby}
                  alt="Avatar"
                  className="imgAvatar rounded-circle"
                />
              </Col>
              <Col xs="9" sm="9" md="9">
                <Row>
                  <CardText className="m-5">
                    <Row className="d-flex">
                      <Col>
                        <p className="name">Ruby Rose</p>
                      </Col>
                      <Col>
                        <p className="messageDate">Il y a 5 minutes.</p>
                      </Col>
                    </Row>
                    <Row>
                      <p className="bodyText text-justify">
                        LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse aliquam facilisis mollis.
                        Ut blandit eget turpis eu placerat. Nam ultrices purus
                        quam, vitae accumsan leo commodo id. Proin non leo quis
                        dui tincidunt porttitor.
                      </p>
                    </Row>
                  </CardText>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <Row>
              <Col xs="9" sm="9" md="9">
                <Row>
                  <CardText className="m-5">
                    <Row className="d-flex">
                      <Col>
                        <p>Il y a 5 minutes.</p>
                      </Col>
                      <Col>
                        <p className="name nameRight">Moi</p>
                      </Col>
                    </Row>
                    <Row>
                      <p className="bodyText text-justify">
                        LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse aliquam facilisis mollis.
                        Ut blandit eget turpis eu placerat. Nam ultrices purus
                        quam, vitae accumsan leo commodo id. Proin non leo quis
                        dui tincidunt porttitor.
                      </p>
                    </Row>
                  </CardText>
                </Row>
              </Col>
              <Col xs="3" sm="3" md="3">
                <CardImg
                  src={Scarlett}
                  alt="Avatar"
                  className="imgAvatar rounded-circle"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Message;
