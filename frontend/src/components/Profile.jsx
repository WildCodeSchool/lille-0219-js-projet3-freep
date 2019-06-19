import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
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
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.`,
        followers: 127,
        following: 31,
        posts: 10
      },
      pictures: []
    };
  }

  componentDidMount() {
    const profileId = this.props.match.params.profileId;

    axios.get(`http://localhost:5050/profile/${profileId}`).then(({ data }) => {
      this.setState({
        user: data.profile,
        pictures: data.pictures
      });
    });
  }

  render() {
    const user = this.state.user;
    const pictures = this.state.pictures;

    return (
      <React.Fragment>
        <Container>
          <Row className="text-center align-items-center">
            <Col md="3" className="text-center mx-auto">
              <Avatar info={user} />
            </Col>
            <Col>
              <Row>
                <Col md="12" lg="3" className="d-flex align-items-center">
                  <Col md="auto">
                    ✮✮✮<span className="starsgrey">✮✮</span>
                  </Col>
                  <Col md="auto" className="nick">
                    <Nickname info={user} />
                  </Col>
                </Col>
                <Col
                  md="8 offset-1"
                  className="text-justify amatic p-3 description"
                >
                  {user.description}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="text-center">
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              {user.followers} Followers
            </Col>
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              {user.following} Following
            </Col>
            <Col sm="12" md="4" xl="2" className="dancingscript py-3">
              {user.posts} Posts
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Éditer</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Message</Button>
            </Col>
          </Row>
          <Row>
            {pictures.map((picture, idx) => {
              return (
                <Col sm="6" md="4" lg="3" xl="2" key={idx}>
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
