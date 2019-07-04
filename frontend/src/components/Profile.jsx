import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Nickname from "./Nickname";
import Photo from "./Photo";
import axios from "axios";
import "../style/Profile.css";
import Loader from "./Loader";
import LazyLoad from "react-lazyload";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1,
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        nickname: "Jade",
        description: `Qu'est-ce que le Lorem Ipsum ?
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.`
      },
      pictures: [],
      followers: [],
      followings: [],
      posts: [],
      loading: true
    };
  }

  componentDidMount() {
    const profileId = this.props.match.params.profileId;
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5050/profil/${profileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(({ data }) => {
        this.setState({
          user: data.profile,
          pictures: data.pictures,
          followers: data.followers,
          followings: data.followings,
          posts: data.posts,
          loading: false
        });
      });
  }

  render() {
    const user = this.state.user;
    const pictures = this.state.pictures;
    const followers = this.state.followers.length;
    const followings = this.state.followings.length;
    const posts = this.state.posts.length;
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <Row className="align-items-center">
                <Col xs="4" md="3">
                  <Avatar info={user} />
                </Col>
                <Col>
                  <Row xs="6" className="align-items-center">
                    <Col xs="auto">
                      <Nickname info={user} />
                    </Col>
                    <Col xs="auto">✮✮✮✮✮</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6" className="align-items-center d-flex">
              <Col className="text-justify">{user.description}</Col>
            </Col>
          </Row>
          <Row className="text-center">
            <Col xs="4" xl="2" className="primaryfont p-0">
              {followers
                ? followers > 9999
                  ? (followers / 1000).toPrecision(3) + "K Followers"
                  : followers < 2
                  ? followers + " Follower"
                  : followers + " Followers"
                : 0 + " Follower"}
            </Col>
            <Col xs="4" xl="2" className="primaryfont p-0">
              {followings
                ? followings > 9999
                  ? (followings / 1000).toPrecision(3) + "K Followers"
                  : followings < 2
                  ? followings + " Following"
                  : followings + " Followings"
                : 0 + " Following"}
            </Col>
            <Col xs="4" xl="2" className="primaryfont p-0">
              {posts
                ? posts > 9999
                  ? (posts / 1000).toPrecision(3) + "K Posts"
                  : posts < 2
                  ? posts + " Post"
                  : posts + " Posts"
                : 0 + " Post"}
            </Col>
            <Col>
              <Button onClick={this.handleClick} className="button primaryfont">
                {this.state.isFollowed ? "Suivie ✓" : "Suivre"}
              </Button>
            </Col>
            <Col>
              <Link to="/message">
                <Button className="button primaryfont">Message</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            {pictures.map((picture, key) => {
              return (
                <Col sm="6" md="4" lg="3" key={key}>
                  <LazyLoad height={100} offset={-200}>
                    <Photo
                      picture={picture.url}
                      link={picture.id_clothing}
                      pictureId={picture.id}
                    />
                  </LazyLoad>
                </Col>
              );
            })}
          </Row>
        </Container>
      );
    }
  }
}

export default Profile;
