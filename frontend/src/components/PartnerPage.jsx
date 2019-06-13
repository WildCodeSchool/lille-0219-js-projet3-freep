import React from "react";
import Partner from "./Partner";
import { Card, CardText, CardBody } from "reactstrap";
import "../style/PartnerPage.css";
class PartnerPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card className="cardPoint">
          <CardBody>
            <CardText>
              <p className="point">Vous avez N points.</p>
              <p>
                5 points = 10% de réduction - 10 points = un vêtement offert -
                15 points = 20% de réduction
              </p>
            </CardText>
          </CardBody>
        </Card>
        <Partner />
        <Partner />
        <Partner />
        <Partner />
        <Partner />
        <Partner />
        <Partner />
        <Partner />
        <Partner />
      </React.Fragment>
    );
  }
}

export default PartnerPage;
