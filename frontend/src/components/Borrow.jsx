//composant pour 1 emprunt
import React from "react";
import { Card, CardBody, CardImg, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Borrow.scss";

class Borrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  handleDelete(e) {
    e.preventDefault();
    const userId = this.props.userId;
    const borrowId = this.props.borrowId;
    axios
      .delete(`http://localhost:5050/emprunt/${userId}/${borrowId}`)
      .then(({ data }) => {
        this.setState({
          hidden: true
        });
      });
  }

  render() {
    return (
      <div className={this.state.hidden ? "hidden" : ""}>
        <Card>
          <CardBody>
            <Link to={`/article/${this.props.clothePage}`} className="link">
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
      </div>
    );
  }
}

export default Borrow;
