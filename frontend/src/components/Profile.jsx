import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Nickname from "./Nickname";
import Photo from "./Photo";
import axios from "axios";
import "../style/Profile.scss";
import Loader from "./Loader";
import LazyLoad from "react-lazyload";
import { Map } from "react-feather";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1,
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        nickname: "Jade",
        description: `Qu'est-ce que le Lorem Ipsum ?
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.`,
        location: "Lille"
      },
      pictures: [],
      followers: [],
      followings: [],
      posts: [],
      loading: true,
      isFollowed: null
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    const currentFollowers = JSON.parse(localStorage.getItem("followers"));
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://localhost:5050/profil/${currentUser}`, {
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
        localStorage.setItem("followers", JSON.stringify(this.state.followers));
        console.log(data);
      });

    for (let i = 0; i <= currentFollowers.length; i++) {
      if (currentUser === currentFollowers[i]) {
        this.setState({
          isFollowed: true
        });
      }
    }
  }

  handleClick() {
    const profileId = this.state.user.id;
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;

    if (!this.state.isFollowed) {
      axios
        .post(`http://localhost:5050/follow/${profileId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          localStorage.setItem("followers", JSON.stringify(data));
          this.setState({
            followers: data,
            isFollowed: true
          });
        });
    } else {
      axios
        .put(`http://localhost:5050/follow/${profileId}`, {
          idAuthor: currentUser
        })
        .then(({ data }) => {
          localStorage.setItem("followers", JSON.stringify(data));
          this.setState({
            followers: data,
            isFollowed: false
          });
        });
    }
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
        <React.Fragment>
          <Row>
            <Col xs="12" sm="6">
              <Row className="align-items-center">
                <Col xs="4">
                  <Avatar info={user} />
                </Col>
                <Col xs="8">
                  <Row xs="6" className="align-items-center">
                    <Col xs="12">
                      <Nickname info={user} />
                    </Col>
                    <Col xs="12" className="location">
                      <Map color="#919191" width="18" />
                      {user.location}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6" className="align-items-center d-flex">
              <Col className="text-justify">{user.description}</Col>
            </Col>
          </Row>
          <Row className="text-center my-5 profile-data">
            <Col xs="4" xl="2" className="p-0">
              {followers
                ? followers > 9999
                  ? (followers / 1000).toPrecision(3) + "K Followers"
                  : followers < 2
                  ? followers + " Follower"
                  : followers + " Followers"
                : 0 + " Follower"}
            </Col>
            <Col xs="4" xl="2" className="p-0">
              {followings
                ? followings > 9999
                  ? (followings / 1000).toPrecision(3) + "K Followers"
                  : followings < 2
                  ? followings + " Following"
                  : followings + " Followings"
                : 0 + " Following"}
            </Col>
            <Col xs="4" xl="2" className="p-0">
              {posts
                ? posts > 9999
                  ? (posts / 1000).toPrecision(3) + "K Posts"
                  : posts < 2
                  ? posts + " Post"
                  : posts + " Posts"
                : 0 + " Post"}
            </Col>
            <Col className="my-5 my-xl-0">
              <Button
                onClick={() => {
                  this.handleClick();
                }}
                className="button px-4"
              >
                {this.state.isFollowed ? "Suivie ✓" : "Suivre"}
              </Button>
            </Col>
            <Col className="my-5 my-xl-0">
              <Link to="/message">
                <Button className="button px-4">Message</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            {pictures.map((picture, key) => {
              return (
                <Col sm="6" md="4" lg="3" key={key}>
                  <LazyLoad height={100} offset={-200}>
                    <Photo picture={picture.url} link={picture.id_clothing} />
                  </LazyLoad>
                </Col>
              );
            })}
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default Profile;
