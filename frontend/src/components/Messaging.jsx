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
                <CardText>
                  <Col xs="3" sm="3" md="3">
                    <CardImg
                      src={this.props.avatar}
                      alt="Avatar"
                      className="imgAvatar rounded-circle"
                    />
                  </Col>
                  <Col xs="9" sm="9" md="9">
                    <Row>
                      <p>{this.props.nickname}</p>
                      <p className="messageDate">{this.props.timeStamp}</p>
                    </Row>
                    <Row>
                      <p>{this.props.message}</p>
                    </Row>
                  </Col>
                </CardText>
              </Row>
            </CardBody>
          </Link>
        </Card>
      </React.Fragment>
    );
  }
}

export default Messaging;
