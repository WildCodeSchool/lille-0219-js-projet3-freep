import React from "react";
import { Card, CardBody, CardText, CardImg, Row, Col } from "reactstrap";
import "../style/Messaging.scss";
import { Link } from "react-router-dom";

class Messaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Link to="/message" className="link">
            <CardBody>
              <Row>
                <Col xs="3" sm="3" md="3">
                  <CardImg
                    src={this.props.avatar}
                    alt="Avatar"
                    className="imgAvatar rounded-circle"
                  />
                </Col>
                <Col xs="9" sm="9" md="9">
                  <Row>
                    <CardText className="m-5">
                      <Row className="d-flex">
                        <Col>
                          <p className="name">
                            {this.props.firstname} {this.props.lastname}
                          </p>
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
                          quam, vitae accumsan leo commodo id. Proin non leo
                          quis dui tincidunt porttitor.
                        </p>
                      </Row>
                    </CardText>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Link>
        </Card>
      </React.Fragment>
    );
  }
}

export default Messaging;
