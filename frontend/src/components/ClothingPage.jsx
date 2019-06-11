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
      // commentsNumber: 35,
      profileInfo: [
        // {
        //   id: 1,
        //   id_user: 1,
        //   type: "Veste",
        //   brand: "ZARA",
        //   size: "XXXL",
        //   gender: "F",
        //   description: "Veste Femme XXXL",
        //   is_deposit: 1,
        //   created_at: "2019-05-14T22:00:00.000Z"
        // }
      ]
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5050/articles`).then(({ data }) => {
      this.setState({
        profileInfo: data[0]
      });
    });
  }

  render() {
    console.log(this.state.profileInfo);
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
                        {/* <Profile /> */}
                        <img
                          // src={this.state.profileInfo.avatar}
                          // alt={`user-${this.state.profileInfo.id}`}
                          className="avatar"
                        />
                      </Col>
                      <Col xs="8">{this.state.profileInfo.brand}</Col>
                    </Row>
                  </div>
                  <div className="text-left">
                    Petite tenue pour cet hiver. Jupe et pull dispo. Les
                    collants: du basique noir.
                  </div>
                  <ul className="text-left list-unstyled list-inline">
                    <li className="list-inline-item">#jupe</li>
                    <li className="list-inline-item">#casual</li>
                    <li className="list-inline-item">#winteriscoming</li>
                  </ul>
                </div>
                {this.state.profileInfo.isCaution ? (
                  <section className="my-3 text-left">Caution demandée</section>
                ) : null}
                {/* <h2>{this.state.commentsNumber} Commentaires</h2> */}
                <div className="comments-feed">
                  {/* <Comment info={this.state.profileInfo} />
                  <Comment info={this.state.profileInfo} /> */}
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
