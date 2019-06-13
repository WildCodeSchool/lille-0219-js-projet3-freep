import React from "react";
import Partner from "./Partner";
import { Card, CardText, CardBody } from "reactstrap";
class PartnerPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardText>Vous avez N points.</CardText>
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
