import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import "../style/ClothingPage.scss";
import Comment from "./Comment";
import Photo from "./Photo";
import axios from "axios";

const items = [
  {
    src:
      "https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901",
    altText: "Slide 1",
    caption: "Slide 1"
  },
  {
    src:
      "https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901",
    altText: "Slide 2",
    caption: "Slide 2"
  },
  {
    src:
      "https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901",
    altText: "Slide 3",
    caption: "Slide 3"
  }
];

class ClothingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {},
      clothingInfo: {},
      commentsInfo: [],
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

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    const userId = this.props.match.params.userId;

    axios.get(`http://localhost:5050/users/1/clothing`).then(({ data }) => {
      this.setState({
        profileInfo: data
      });
    });

    axios
      .get(`http://localhost:5050/articles/${articleId}`)
      .then(({ data }) => {
        this.setState({
          clothingInfo: data
        });
      });
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

  render() {
    const profile = this.state.profileInfo;
    const clothing = this.state.clothingInfo;
    const comments = this.state.commentsInfo;

    const { width } = this.state;
    const isMobile = width <= 640;

    const { activeIndex } = this.state;

    return (
      <Container className="clothing-container">
        <Row className="px-4">
          <Col lg="7" className="justify-content-center">
            <section>
              {(() => {
                if (isMobile) {
                  const slides = items.map((item, key) => {
                    return (
                      <CarouselItem
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        key={item.src + key}
                      >
                        <Photo
                          picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901"
                          alt={item.altText}
                          caption={item.caption}
                        />
                        <CarouselCaption
                          captionText={item.caption}
                          captionHeader={item.caption}
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
                        items={items}
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
                        <Col xs="6">
                          <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="6" md="4">
                          <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                        </Col>
                        <Col xs="6" md="4">
                          <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                }
              })()}
            </section>
            <section>
              <h2 className="text-center">Elles l'ont porté récemment</h2>
              <Row className="justify-content-center">
                <Col xs="6" md="4">
                  <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                </Col>
                <Col xs="6" md="4">
                  <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="6" md="4">
                  <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                </Col>
                <Col xs="6" md="4">
                  <Photo picture="https://scstylecaster.files.wordpress.com/2014/12/london-moc-a-rs15-9467.jpg?w=600&h=901" />
                </Col>
              </Row>
            </section>
          </Col>
          <Col lg="5" className="comments-container">
            <div className="sub-container">
              <section>
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
                    <div>{clothing.description}</div>
                  </div>
                </div>
              </section>
              {clothing.is_deposit ? (
                <section className="my-3 text-left">Caution demandée</section>
              ) : null}
              <h2>
                {comments.length} Commentaire
                {comments.length >= 2 ? "s" : ""}
              </h2>
              {comments.length === 0 ? (
                <div className="alert text-center alert-info">
                  Sois la première à laisser un commentaire !
                </div>
              ) : null}
              <div className="comments-feed">
                {comments.map((comment, key) => {
                  return <Comment key={key} comment={comment} />;
                })}
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
    );
  }
}

export default ClothingPage;
