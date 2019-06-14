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
                    <p className="name">
                      {this.props.firstname} {this.props.lastname}
                    </p>
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
          </Link>
        </Card>
      </React.Fragment>
    );
  }
}

export default Messaging;
