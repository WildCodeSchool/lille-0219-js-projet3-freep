//composant pour 1 message
import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import "../style/Messaging.scss";
import { Link } from "react-router-dom";

const Messaging = props => {
  return (
    <Card className="messaging-card">
      <Link
        to={"/message/" + props.id_author + "/" + props.id_reader}
        className="link"
      >
        <CardBody>
          <Row className="align-items-center px-3 message-text">
            <Col xs="3">
              <img
                src={props.avatar}
                alt="Avatar"
                className="imgAvatar rounded-circle"
              />
            </Col>
            <Col xs="9" className="d-flex my-5 flex-column">
              <Row className="align-items-center">
                <Col>
                  <p className="name">{props.nickname}</p>
                </Col>
                <Col className="text-right">
                  <p className="messageDate timeStamp text-muted font-italic">
                    {props.timeStamp}
                  </p>
                </Col>
              </Row>
              <p className="bodyText text-justify px-5">{props.message}</p>
            </Col>
          </Row>
        </CardBody>
      </Link>
    </Card>
  );
};

export default Messaging;
