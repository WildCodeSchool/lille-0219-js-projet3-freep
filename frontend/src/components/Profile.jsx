import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Nickname from "./Nickname";
import Photo from "./Photo";
import axios from "axios";
import "../style/Profile.css";

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
      social: [
        {
          nbFollowers: 23333
        },
        {
          nbFollowing: 313445
        },
        {
          nbPosts: 10923
        }
      ]
    };
  }

  componentDidMount() {
    const profileId = this.props.match.params.profileId;

    axios.get(`http://localhost:5050/profil/${profileId}`).then(({ data }) => {
      this.setState(
        {
          user: data.profile,
          pictures: data.pictures,
          social: data.social
        },
        () => {
          console.log(data.social);
        }
      );
    });
  }

  render() {
    const user = this.state.user;
    const pictures = this.state.pictures;
    const social = this.state.social;

    return (
      <React.Fragment>
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
              {social[0]
                ? social[0].nbFollowers > 9999
                  ? (social[0].nbFollowers / 1000).toPrecision(3) +
                    "K Followers"
                  : social[0].nbFollowers < 2
                  ? social[0].nbFollowers + " Follower"
                  : social[0].nbFollowers + " Followers"
                : 0 + " Follower"}
            </Col>
            <Col xs="4" xl="2" className="primaryfont p-0">
              {social[1]
                ? social[1].nbFollowing > 9999
                  ? (social[1].nbFollowing / 1000).toPrecision(3) +
                    "K Followers"
                  : social[1].nbFollowing < 2
                  ? social[1].nbFollowing + " Following"
                  : social[1].nbFollowing + " Followings"
                : 0 + " Following"}
            </Col>
            <Col xs="4" xl="2" className="primaryfont p-0">
              {social[2]
                ? social[2].nbPosts > 9999
                  ? (social[2].nbPosts / 1000).toPrecision(3) + "K Posts"
                  : social[2].nbPosts < 2
                  ? social[2].nbPosts + " Post"
                  : social[2].nbPosts + " Posts"
                : 0 + " Post"}
            </Col>
            <Col>
              <Button className="button primaryfont">Suivre</Button>
            </Col>
            <Col>
              <Link to="/message">
                <Button className="button primaryfont">Message</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            {pictures.map((picture, idx) => {
              return (
                <Col md="6" lg="3" key={idx}>
                  <Photo picture={picture.url} link={picture.id_clothing} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
