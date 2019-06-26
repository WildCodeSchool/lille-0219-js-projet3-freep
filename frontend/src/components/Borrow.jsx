//composant pour 1 emprunt
import React from "react";
import { Card, CardBody, CardImg, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDelete(e) {
    e.preventDefault();
    const userId = this.props.match.params.userId;
    const borrowId = this.props.match.params.borrowId;
    axios
      .delete(`http://localhost:5050/emprunt/${userId}/${borrowId}`)
      .then(({ data }) => {
        this.props.borrowArray = data;
      });
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Link to="" className="link">
              <CardImg src={this.props.pictureUrl} alt="borrowClothe" />
            </Link>
            <Button
              onClick={e => {
                this.handleDelete(e);
              }}
            >
              Annuler l'emprunt
            </Button>
            <Button>J'ai emprunté le vêtement</Button>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Borrow;
