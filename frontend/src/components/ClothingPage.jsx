import React from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "../style/ClothingPage.scss";
import Comment from "./Comment";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";
// import CommentForm from "./CommentForm";

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clothing: {},
      users: [],
      pictures: [],
      commentsArray: [],
      comment: "",
      loading: true,
      width: window.innerWidth,
      activeIndex: 0
    };
  }

  // Get articles

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    axios
      .get(`http://localhost:5050/articles/${articleId}`)
      .then(({ data }) => {
        this.setState({
          clothing: data.clothing,
          users: data.users,
          pictures: data.pictures,
          commentsArray: data.comments,
          loading: false
        });
      });
  }

  getUser = id => {
    const users = this.state.users.filter(user => {
      return user.id === id;
    });
    return users[0];
  };

  // Resize window for conditional rendering

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  // Add article to borrow list

  handleAdd(e) {
    const userId = 1;
    const clothingId = this.state.clothing.id;
    const pictureId = this.state.pictures[0].id;
    axios
      .post(
        `http://localhost:5050/emprunt/${userId}/${clothingId}/${pictureId}`
      )
      .then(({ data }) => {
        data.id_user = userId;
        data.id_clothing = clothingId;
        data.id_picture = pictureId;
        this.props.history.push(`/message/1/${this.state.users[0].id}`);
      })
      .catch(err => {
        console.log(`Nope! ${err}`);
      });
  }

  // Comment form

  handleFieldChange = event => {
    const { value } = event.target;
    this.setState({
      comment: value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const articleId = this.state.clothing.id;
    let { comment } = this.state;
    axios
      .post(`http://localhost:5050/comment/${articleId}`, {
        content: comment
      })
      .then(({ data }) => {
        let comments = this.state.commentsArray;
        comments.unshift(data);
        this.setState({
          loading: false,
          commentsArray: comments,
          comment: ""
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 640;
    const { activeIndex } = this.state;
    const clothing = this.state.clothing;
    const pictures = this.state.pictures;
    const comments = this.state.commentsArray;
    const auth = this.getUser(clothing.id_user);

    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Container className="clothing-container">
          <Row className="px-4">
            <Col lg="7" className="justify-content-center">
              <section>
                {(() => {
                  if (isMobile) {
                    const slides = pictures.map((picture, key) => {
                      return (
                        <CarouselItem
                          onExiting={this.onExiting}
                          onExited={this.onExited}
                        >
                          <Photo
                            key={key}
                            picture={picture.url}
                            alt={picture.altText}
                          />
                        </CarouselItem>
                      );
                    });

                    return (
                      <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                      >
                        <CarouselIndicators
                          items={pictures}
                          activeIndex={activeIndex}
                          onClickHandler={this.goToIndex}
                        />
                        {slides}
                        <CarouselControl
                          direction="prev"
                          directionText="Previous"
                          onClickHandler={this.previous}
                        />
                        <CarouselControl
                          direction="next"
                          directionText="Next"
                          onClickHandler={this.next}
                        />
                      </Carousel>
                    );
                  } else {
                    return (
                      <React.Fragment>
                        <Row className="justify-content-center">
                          {pictures.map((picture, key) => {
                            return (
                              <Col xs="6" md="4" key={key}>
                                <Photo picture={picture.url} />
                              </Col>
                            );
                          })}
                        </Row>
                      </React.Fragment>
                    );
                  }
                })()}
              </section>
              <section>
                <h2 className="text-center">Elles l'ont porté récemment</h2>
                <Row className="justify-content-center">
                  {pictures.map((picture, key) => {
                    return (
                      <Col xs="6" md="6" key={key}>
                        <Photo picture={picture.url} />
                      </Col>
                    );
                  })}
                </Row>
              </section>
            </Col>
            <Col lg="5" className="comments-container">
              <div className="sub-container">
                <section>
                  <div className="p-4 comments-feed">
                    <div>
                      <Row className="align-items-center">
                        <Col xs="6" md="5">
                          <img
                            src={auth && auth.avatar}
                            alt={`user-${auth && auth.id}`}
                            className="avatar"
                            width="70px"
                          />
                        </Col>
                        <Col xs="6" className="profile-name">
                          {auth && auth.nickname}
                        </Col>
                      </Row>
                    </div>
                    <div className="pt-4">
                      <div>{clothing.description}</div>
                    </div>
                  </div>
                </section>
                {clothing.is_deposit ? (
                  <div className="comments-feed my-4 text-center">
                    <h4 className="p-0">Caution demandée</h4>
                  </div>
                ) : null}
                <Button
                  onClick={e => {
                    this.handleAdd(e);
                  }}
                >
                  Tu veux emprunter ce vêtement? Contacte-moi!
                </Button>
                <h2>
                  {comments.length} Commentaire
                  {comments.length >= 2 ? "s" : ""}
                </h2>
                <div className="comments-feed">
                  {comments.length === 0 ? (
                    <div className="text-center">
                      Sois la première à laisser un commentaire !
                    </div>
                  ) : null}
                  {comments.map((comment, key) => {
                    const user = this.getUser(comment.id_user);
                    console.log(user);
                    return (
                      <Comment key={key} comment={comment} profile={user} />
                    );
                  })}
                </div>
              </div>
              <Form
                className="comment-form"
                onSubmit={e => {
                  this.onSubmit(e);
                }}
              >
                <FormGroup>
                  <Label>
                    <h2>Et toi, qu'en penses-tu?</h2>
                  </Label>
                  <Col xs="9" lg="12" className="offset-3 offset-lg-0 p-0">
                    <Input
                      onChange={this.handleFieldChange}
                      value={this.state.comment}
                      type="text"
                      name="message"
                      placeholder="Ecris ton message ici"
                    />
                    <Row className="justify-content-end p-3">
                      <Button>Envoyer</Button>
                    </Row>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default ClothingPage;
