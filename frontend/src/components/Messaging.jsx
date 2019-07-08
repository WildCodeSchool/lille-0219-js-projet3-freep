//composant pour 1 message
import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
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
          <Link
            to={"/message/" + this.props.id_author + "/" + this.props.id_reader}
            className="link"
          >
            <CardBody>
              <Row className="align-items-center px-3">
                <Col xs="3">
                  <img
                    src={this.props.avatar}
                    alt="Avatar"
                    className="imgAvatar rounded-circle"
                  />
                </Col>
                <Col xs="9">
                  <Row className="m-5">
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
                    <p className="bodyText text-justify px-5">
                      {this.props.message}
                    </p>
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
