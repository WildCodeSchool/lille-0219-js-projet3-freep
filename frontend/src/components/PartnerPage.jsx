import React from "react";
import Partner from "./Partner";
import { Card, CardBody } from "reactstrap";
import "../style/PartnerPage.css";
class PartnerPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card className="cardPoint">
          <CardBody>
            <p className="point">Vous avez N points.</p>
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
