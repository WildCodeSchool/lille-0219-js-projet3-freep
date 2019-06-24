import React from "react";
import { Card, CardBody, CardImg, Row, Col } from "reactstrap";
import "../style/Messaging.scss";
import { Link } from "react-router-dom";

class Messaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  <div className="m-5">
                    <Row className="d-flex">
                      <Col>
                        <p className="name">{this.props.nickname}</p>
                      </Col>
                      <Col>
                        <p className="messageDate timeStamp">
                          {this.props.timeStamp}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <p className="bodyText text-justify">
                        {this.props.message}
                      </p>
                    </Row>
                  </div>
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
