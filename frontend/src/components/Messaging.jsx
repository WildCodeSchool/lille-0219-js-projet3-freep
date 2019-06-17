import React from "react";
import { Card, CardBody, CardText, CardImg } from "reactstrap";
import { Row } from "reactstrap";
import "../style/Messaging.scss";
import { Link } from "react-router-dom";

class Messaging extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Card info={this.props}>
          <Link to="/message">
            <CardBody>
              <CardImg
                src={this.props.avatar}
                alt="Avatar"
                className="imgAvatar"
              />
              <Row>
                <CardText className="cardTextMessaging">
                  <Row>
                    <p>{this.props.nickname}</p>
                    <p className="messageDate">{this.props.timeStamp}</p>
                  </Row>
                  <Row>
                    <p>{this.props.message}</p>
                  </Row>
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
