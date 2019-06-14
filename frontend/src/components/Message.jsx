import React from "react";
import { Card, CardBody, CardText, CardImg } from "reactstrap";
import { Row } from "reactstrap";
import "../style/Messaging.scss";
import Ruby from "../pictures/Ruby.jpg";
import Scarlett from "../pictures/Scarlett.jpg";

class Message extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardImg src={Ruby} alt="Avatar" className="imgAvatar" />
            <Row>
              <CardText className="cardTextMessaging">
                <Row>
                  <p>Ruby Rose</p>
                  <p className="messageDate">Il y a 5 minutes.</p>
                </Row>
                <Row>
                  <p>
                    LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse aliquam facilisis mollis. Ut
                    blandit eget turpis eu placerat. Nam ultrices purus quam,
                    vitae accumsan leo commodo id. Proin non leo quis dui
                    tincidunt porttitor.
                  </p>
                </Row>
              </CardText>
            </Row>
          </CardBody>
          <CardBody>
            <CardImg src={Scarlett} alt="Avatar" className="imgAvatarRight" />
            <Row>
              <CardText className="cardTextMessaging">
                <Row>
                  <p>Il y a 5 minutes.</p>
                  <p className="name">Moi</p>
                </Row>
                <Row>
                  <p>
                    LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse aliquam facilisis mollis. Ut
                    blandit eget turpis eu placerat. Nam ultrices purus quam,
                    vitae accumsan leo commodo id. Proin non leo quis dui
                    tincidunt porttitor.
                  </p>
                </Row>
              </CardText>
            </Row>
          </CardBody>
          <CardBody>
            <CardImg src={Ruby} alt="Avatar" className="imgAvatar" />
            <Row>
              <CardText className="cardTextMessaging">
                <Row>
                  <p>Ruby Rose</p>
                  <p className="messageDate">Il y a 5 minutes.</p>
                </Row>
                <Row>
                  <p>
                    LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse aliquam facilisis mollis. Ut
                    blandit eget turpis eu placerat. Nam ultrices purus quam,
                    vitae accumsan leo commodo id. Proin non leo quis dui
                    tincidunt porttitor.
                  </p>
                </Row>
              </CardText>
            </Row>
          </CardBody>
          <CardBody>
            <CardImg src={Scarlett} alt="Avatar" className="imgAvatarRight" />
            <Row>
              <CardText className="cardTextMessaging">
                <Row>
                  <p>Il y a 5 minutes.</p>
                  <p className="name">Moi</p>
                </Row>
                <Row>
                  <p>
                    LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse aliquam facilisis mollis. Ut
                    blandit eget turpis eu placerat. Nam ultrices purus quam,
                    vitae accumsan leo commodo id. Proin non leo quis dui
                    tincidunt porttitor.
                  </p>
                </Row>
              </CardText>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Message;
