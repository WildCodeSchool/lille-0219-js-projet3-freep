//composant pour 1 message
import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import "../style/Messaging.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend } from "../conf";

class Messaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      P2: null,
      profile: undefined,
      recipe: []
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if ("user" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
      let P2_id = null;
      if (currentUser === this.props.id_reader) {
        P2_id = this.props.id_author;
      } else {
        P2_id = this.props.id_reader;
      }
      this.setState(
        {
          profile: currentUser,
          P2: P2_id
        },
        () => {
          axios
            .get(`${backend}/recipe/${this.state.P2}`, {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            })
            .then(({ data }) => {
              this.setState({
                recipe: data
              });
            });
        }
      );
    }
  }

  render() {
    return (
      <Card className="messaging-card">
        <Link
          to={"/message/" + this.state.profile + "/" + this.state.P2}
          className="link"
        >
          <CardBody>
            <Row className="align-items-center px-3 message-text">
              <Col md="3">
                {this.state.recipe.map((recipe, i) => {
                  return (
                    <img
                      src={recipe.avatar}
                      alt="Avatar"
                      className="imgAvatar avatar rounded-circle mx-auto my-5"
                      key={`b+${i}`}
                    />
                  );
                })}
              </Col>
              <Col md="9" className="d-flex my-3 flex-column">
                <Row className="align-items-center">
                  {this.state.recipe.map((recipe, i) => {
                    return (
                      <Col key={`j+${i}`}>
                        <p className="name">{recipe.nickname}</p>
                      </Col>
                    );
                  })}
                  <Col className="text-right">
                    <p className="messageDate timeStamp text-muted font-italic">
                      {this.props.timeStamp}
                    </p>
                  </Col>
                </Row>
                {this.state.recipe.map((recipe, i) => {
                  return (
                    <React.Fragment key={`h+${i}`}>
                      <p className="bodyText text-md-justify px-md-5">
                        {recipe.id !== this.props.id_author
                          ? "Toi : " + this.props.message
                          : recipe.nickname + " : " + this.props.message}
                      </p>
                    </React.Fragment>
                  );
                })}
              </Col>
            </Row>
          </CardBody>
        </Link>
      </Card>
    );
  }
}

export default Messaging;
