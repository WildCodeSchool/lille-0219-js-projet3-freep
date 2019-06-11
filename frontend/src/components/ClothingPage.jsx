import React from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import "../style/ClothingPage.scss";
import Comment from "./Comment";
import Photo from "./Photo";
import axios from "axios";

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
      clothingInfo: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5050/articles`).then(({ data }) => {
      this.setState({
        clothingInfo: data[0]
      });
    });

    axios.get(`http://localhost:5050/users`).then(({ data }) => {
      this.setState({
        profileInfo: data[0]
      });
    });
  }

  render() {
    const profile = this.state.profileInfo;
    const clothing = this.state.clothingInfo;
    return (
      <React.Fragment>
        <Container className="clothing-container">
          <Row>
            <Col lg="7" className="justify-content-center">
              <Row className="justify-content-center">
                <Photo />
              </Row>
              <Row className="justify-content-center">
                <Col xs="5">
                  <Photo />
                </Col>
                <Col xs="5">
                  <Photo />
                </Col>
              </Row>
            </Col>
            <Col lg="5" className="comments-container">
              <div className="sub-container">
                <div className="p-4 comments-feed">
                  <div className="m-3">
                    <Row className="align-items-center">
                      <Col xs="4">
                        <img
                          src={profile.avatar}
                          alt={`user-${profile.id}`}
                          className="avatar"
                        />
                      </Col>
                      <Col xs="8">{profile.nickname}</Col>
                    </Row>
                  </div>
                  <div className="text-left">{clothing.description}</div>
                  <ul className="text-left list-unstyled list-inline">
                    <li className="list-inline-item">#jupe</li>
                    <li className="list-inline-item">#casual</li>
                    <li className="list-inline-item">#winteriscoming</li>
                  </ul>
                </div>
                {clothing.is_deposit ? (
                  <section className="my-3 text-left">Caution demandée</section>
                ) : null}
                <h2>{clothing.commentsNumber} Commentaires</h2>
                <div className="comments-feed">
                  <Comment info={profile} />
                </div>
              </div>
              <Form className="comment-form">
                <FormGroup>
                  <Label>
                    <h2>Et toi, qu'en penses-tu?</h2>
                  </Label>
                  <Col xs="9" lg="12" className="offset-3 offset-lg-0 p-0">
                    <Input type="text" name="text" id="comment-form" />
                    <Row className="justify-content-end p-3">
                      <button>Envoyer</button>
                    </Row>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ClothingPage;
