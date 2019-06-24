// Page des conversations
import React from "react";
import axios from "axios";
import { Card, CardBody, CardText, CardImg, Row, Col } from "reactstrap";
import "../style/Messaging.scss";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageArray: [{}]
    };
  }

  componentDidMount() {
    const P1 = this.props.match.params.P1;
    const P2 = this.props.match.params.P2;

    axios.get(`http://localhost:5050/message/${P1}/${P2}`).then(({ data }) => {
      this.setState({
        messageArray: data
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {/* {this.state.messagingArray.length === 0 ? (
          <p>Vous n'avez pas de conversation.</p>
        ) : (
          ""
        )}
        {this.state.messagingArray.map((messaging, i) => { */}
        {this.state.messageArray.map((message, i) => {
          console.log("message => " + message.data);
          return (
            <Card>
              <CardBody>
                <Row>
                  <Col xs="3" sm="3" md="3">
                    <CardImg
                      src={message.avatar}
                      alt="Avatar"
                      className="imgAvatar rounded-circle"
                    />
                  </Col>
                  <Col xs="9" sm="9" md="9">
                    <Row>
                      <CardText className="m-5">
                        <Row className="d-flex">
                          <Col>
                            <p className="name">{message.nickname}</p>
                          </Col>
                          <Col>
                            <p className="messageDate timeStamp">
                              {message.date_diff >= 1
                                ? "Il y a " + message.date_diff + " jours."
                                : "Envoyé à " + message.hour_send + "."}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p className="bodyText text-justify">
                            {message.content}
                          </p>
                        </Row>
                      </CardText>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Message;
