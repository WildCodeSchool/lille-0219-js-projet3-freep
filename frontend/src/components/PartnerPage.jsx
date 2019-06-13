import React from "react";
import Partner from "./Partner";
import { Card, CardText, CardBody, Container } from "reactstrap";
import "../style/PartnerPage.css";
class PartnerPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card className="cardPoint">
          <CardBody>
            <CardText>Vous avez N points.</CardText>
          </CardBody>
        </Card>
        <Container>
          <Partner />
          <Partner />
          <Partner />
          <Partner />
          <Partner />
          <Partner />
          <Partner />
          <Partner />
          <Partner />
        </Container>
      </React.Fragment>
    );
  }
}

export default PartnerPage;
