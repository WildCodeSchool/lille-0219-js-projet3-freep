import React from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button
} from "reactstrap";
import "../style/ClothingPage.scss";
import Comment from "./Comment";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";
import CommentForm from "./CommentForm";

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendData: {
        clothing: {},
        users: [],
        pictures: [],
        comments: []
      },
      loading: true,
      width: window.innerWidth,
      activeIndex: 0
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
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

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    axios
      .get(`http://localhost:5050/articles/${articleId}`)
      .then(({ data }) => {
        this.setState({
          backendData: {
            clothing: data.clothing,
            users: data.users,
            pictures: data.pictures,
            comments: data.comments
          },
          loading: false
        });
      });
  }

  next() {
    const pictures = this.state.backendData.pictures;
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === pictures.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const pictures = this.state.backendData.pictures;
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
    const users = this.state.backendData.users.filter(user => {
      return user.id === id;
    });
    return users[0];
  };

  handleAdd(e) {
    const userId = 1;
    const clothingId = this.state.backendData.clothing.id;
    const pictureId = this.state.backendData.pictures[0].id;
    axios
      .post(
        `http://localhost:5050/emprunt/${userId}/${clothingId}/${pictureId}`
      )
      .then(({ data }) => {
        data.id_user = userId;
        data.id_clothing = clothingId;
        data.id_picture = pictureId;
        this.props.history.push(
          `/message/1/${this.state.backendData.users[0].id}`
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
    const clothing = this.state.backendData.clothing;
    const pictures = this.state.backendData.pictures;
    const comments = this.state.backendData.comments;
    const auth = this.getUser(clothing.id_user);

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
                            link={picture.id_clothing}
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
                        {pictures.map((picture, key) => {
                          return (
                            <Col xs="6" md="4" key={key}>
                              <Photo
                                picture={picture.url}
                                pictureId={picture.id}
                                link={picture.id_clothing}
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
                <Row className="justify-content-center">
                  {pictures.map((picture, key) => {
                    return (
                      <Col xs="6" md="6" key={key}>
                        <Photo
                          picture={picture.url}
                          pictureId={picture.id}
                          link={picture.id_clothing}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </section>
            </Col>
            <Col lg="6" className="comments-container pr-3">
              <div className="sub-container d-flex flex-column">
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
                      <React.Fragment>
                        <Comment key={key} comment={comment} profile={user} />
                        <hr />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <CommentForm article={clothing.id} />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default ClothingPage;
