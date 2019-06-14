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
      profileInfo: {},
      clothingInfo: {},
      commentsInfo: {}
    };
  }

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    const userId = this.props.match.params.userId;

    axios
      .get(`http://localhost:5050/articles/${articleId}`)
      .then(({ data }) => {
        this.setState({
          clothingInfo: data
        });
      });

    axios.get(`http://localhost:5050/users/${userId}`).then(({ data }) => {
      this.setState({
        profileInfo: data
      });
    });

    axios
      .get(`http://localhost:5050/articles/${articleId}/comments`)
      .then(({ data }) => {
        this.setState({
          commentsInfo: data
        });
      });
  }

  render() {
    const profile = this.state.profileInfo;
    const clothing = this.state.clothingInfo;
    const comments = this.state.commentsInfo;
    return (
      <React.Fragment>
        <Container className="clothing-container">
          <Row className="px-4">
            <Col lg="7" className="justify-content-center">
              <Row className="justify-content-center">
                <Col xs="6">
                  <Photo />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="6" md="4">
                  <Photo />
                </Col>
                <Col xs="6" md="4">
                  <Photo />
                </Col>
              </Row>
              <h2>Elles l'ont porté récemment</h2>
              <Row className="justify-content-center">
                <Col xs="6" md="4">
                  <Photo />
                </Col>
                <Col xs="6" md="4">
                  <Photo />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="6" md="4">
                  <Photo />
                </Col>
                <Col xs="6" md="4">
                  <Photo />
                </Col>
              </Row>
            </Col>
            <Col lg="5" className="comments-container">
              <div className="sub-container">
                <div className="p-4 comments-feed">
                  <div>
                    <Row className="align-items-center">
                      <Col xs="3">
                        <img
                          src={profile.avatar}
                          alt={`user-${profile.id}`}
                          className="avatar"
                          width="70px"
                        />
                      </Col>
                      <Col xs="9" className="profile-name">
                        {profile.nickname}
                      </Col>
                    </Row>
                  </div>
                  <div className="pt-4">
                    <div className="text-left">{clothing.description}</div>
                  </div>
                </div>
                {clothing.is_deposit ? (
                  <section className="my-3 text-left">Caution demandée</section>
                ) : null}
                <h2>
                  {comments.count}
                  {comments.count >= 2 ? " Commentaires" : " Commentaire"}
                </h2>
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
