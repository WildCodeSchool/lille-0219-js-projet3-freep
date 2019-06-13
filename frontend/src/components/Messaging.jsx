import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import "../pictures/Avatar.jpg";

class Messaging extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <img src={Avatar} alt="Avatar" />
            <p>FirstName LASTNAME</p>
            <p>
              LAST MESSAGE. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse aliquam facilisis mollis. Ut blandit eget turpis
              eu placerat. Nam ultrices purus quam, vitae accumsan leo commodo
              id. Proin non leo quis dui tincidunt porttitor.
            </p>
            <p>Il y a 5 minutes.</p>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Messaging;
