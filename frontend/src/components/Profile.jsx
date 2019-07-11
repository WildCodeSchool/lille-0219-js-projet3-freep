import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Nickname from "./Nickname";
import Photo from "./Photo";
import axios from "axios";
import "../style/Profile.scss";
import Loader from "./Loader";
import { Map } from "react-feather";
import Masonry from "react-masonry-component";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
    const user = JSON.parse(localStorage.getItem("user"));
    const profileId = this.props.match.params.profileId;
    const currentFollowers = JSON.parse(localStorage.getItem("followers"));
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
        localStorage.setItem("followers", JSON.stringify(this.state.followers));
      });

    if (currentFollowers > 0) {
      for (let i = 0; i < currentFollowers.length; i++) {
        const followersId = currentFollowers[i].id_user;
        if (currentUser === followersId) {
          this.setState({
            isFollowed: true
          });
        }
      }
    }
  }

  handleClick() {
    const profileId = this.props.match.params.profileId;
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

  handleLogout() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
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
                      <a
                        href={`https://google.com/maps/dir//${user.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.location}
                      </a>
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
              {this.state.user.id !== currentUser ? (
                <Button
                  onClick={() => {
                    this.handleClick();
                  }}
                  className="button px-4"
                >
                  {this.state.isFollowed ? "Suivie ✓" : "Suivre"}
                </Button>
              ) : (
                <Link to="/modification">
                  <Button className="button px-4">Éditer</Button>
                </Link>
              )}
            </Col>
            <Col className="my-5 my-xl-0">
              {this.state.user.id === currentUser ? (
                <Button
                  onClick={() => {
                    this.handleLogout();
                  }}
                  className="button px-4"
                >
                  Se déconnecter
                </Button>
              ) : (
                <Link to={`/message/${currentUser}/${user.id}`}>
                  <Button className="button px-4">Message</Button>
                </Link>
              )}
            </Col>
          </Row>
          <Masonry>
            {pictures.map((picture, key) => {
              return (
                <Col sm="6" md="4" lg="3" key={key}>
                  <Photo
                    picture={picture.url}
                    link={picture.id_clothing}
                    pictureId={picture.id}
                  />
                </Col>
              );
            })}
          </Masonry>
        </React.Fragment>
      );
    }
  }
}

export default Profile;
