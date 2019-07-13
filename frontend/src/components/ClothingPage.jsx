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
import { Link } from "react-router-dom";
import "../style/ClothingPage.scss";
import Comment from "./Comment";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";
import Masonry from "react-masonry-component";

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

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5050/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
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

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  // Comment form

  handleFieldChange(e) {
    const { value } = e.target;
    this.setState({ comment: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const articleId = this.state.clothing.id;
    let { comment } = this.state;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    axios
      .post(`http://localhost:5050/comment/${articleId}`, {
        content: comment,
        idAuthor: currentUser
      })
      .then(({ data }) => {
        let comments = this.state.commentsArray;
        data.hour_send = "l'instant";
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

  next() {
    const pictures = this.state.pictures;
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === pictures.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const pictures = this.state.pictures;
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? pictures.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  getUser = id => {
    const users = this.state.users.filter(user => {
      return user.id === id;
    });
    return users[0];
  };

  handleAdd(e) {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    const clothingId = this.state.clothing.id;
    const pictureId = this.state.pictures[0].id;
    axios
      .post(
        `http://localhost:5050/emprunt/${currentUser}/${clothingId}/${pictureId}`
      )
      .then(({ data }) => {
        data.id_user = currentUser;
        data.id_clothing = clothingId;
        data.id_picture = pictureId;
        this.props.history.push(
          `/message/${currentUser}/${this.state.clothing.id_user}`
        );
      })
      .catch(err => {
        console.log(`Nope! ${err}`);
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
    const proofPictures = pictures.filter(x => x.is_proof);
    const initialPictures = pictures.filter(x => !x.is_proof);

    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Container className="clothing-container">
          <Row className="p-3">
            <Col lg="6" className="justify-content-center">
              <section>
                {(() => {
                  if (isMobile) {
                    const slides = initialPictures.map((picture, key) => {
                      return (
                        <CarouselItem
                          key={key}
                          onExiting={this.onExiting}
                          onExited={this.onExited}
                        >
                          <Photo
                            key={key}
                            picture={picture.url}
                            alt={picture.altText}
                            link={picture.id_clothing}
                            pictureId={picture.id}
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
                      <Row className="justify-content-center">
                        {initialPictures.map((picture, key) => {
                          return (
                            <Col xs="6" key={key}>
                              <Photo
                                key={key}
                                picture={picture.url}
                                alt={picture.altText}
                                link={picture.id_clothing}
                                pictureId={picture.id}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  }
                })()}
              </section>
              <section>
                <h2 className="text-center">Elles l'ont porté récemment</h2>
                <Masonry className="justify-content-center">
                  {proofPictures.map((picture, key) => {
                    return (
                      <Col xs="6" key={key}>
                        <Photo
                          picture={picture.url}
                          pictureId={picture.id}
                          link={picture.id_clothing}
                        />
                      </Col>
                    );
                  })}
                </Masonry>
              </section>
            </Col>
            <Col lg="6" className="comments-container pr-3">
              <div className="sub-container d-flex flex-column">
                <section>
                  <div className="p-4 comments-feed">
                    <Link to={`/profil/${auth.id}`}>
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
                    </Link>
                    <div className="pt-4">
                      <div>{clothing.description}</div>
                      <Row className="pt-4 pr-3">
                        <Col xs="8" className="borrow-phrase">
                          Tu veux emprunter ce vêtement?
                        </Col>
                        <Button
                          className="col-4"
                          onClick={e => {
                            this.handleAdd(e);
                          }}
                        >
                          Contacte-moi !
                        </Button>
                      </Row>
                    </div>
                  </div>
                </section>
                {clothing.is_deposit ? (
                  <div className="comments-feed my-4 text-center">
                    <h4 className="p-0">Caution demandée</h4>
                  </div>
                ) : null}
                <h2>
                  {comments.length} Commentaire
                  {comments.length >= 2 ? "s" : ""}
                </h2>
                <div className="comments-feed">
                  {comments.length === 0 ? (
                    <div className="text-center no-comment-text">
                      Sois la première à laisser un commentaire !
                    </div>
                  ) : null}
                  {comments.map((comment, key) => {
                    const user = this.getUser(comment.id_user);
                    return (
                      <React.Fragment key={key}>
                        <Comment
                          comment={comment}
                          profile={user}
                          timeStamp={
                            comment.date_diff >= 1
                              ? "Il y a " + comment.date_diff + " jours."
                              : "Envoyé à " + comment.hour_send + "."
                          }
                        />
                        <hr />
                      </React.Fragment>
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
                      onChange={e => this.handleFieldChange(e)}
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
