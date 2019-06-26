//composant pour 1 emprunt
import React from "react";
import { Card, CardBody, CardImg, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Link to="" className="link">
              <CardImg src={this.props.pictureId} alt="borrowClothe" />
            </Link>
            <Button>Annuler l'emprunt</Button>
            <Button>J'ai emprunté le vêtement</Button>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Borrow;
