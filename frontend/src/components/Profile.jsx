import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Avatar from "./Avatar";
import Nickname from "./Nickname";
import Photo from "./Photo";
import "../style/Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: {
        id: 1,
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        username: "Jade",
        description: `Qu'est-ce que le Lorem Ipsum ?
        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.`,
        followers: 127,
        following: 31,
        posts: 10
      }
    };
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="text-center align-items-center">
            <Col md="3" className="text-center mx-auto">
              <Avatar info={this.state.profileInfo} />
            </Col>
            <Col md="3">
              <Col>
                ✮✮✮<span className="starsgrey">✮✮</span>
              </Col>
              <Col>
                <Nickname info={this.state.profileInfo} />
              </Col>
            </Col>
            <Col className="text-justify amatic p-3">
              {this.state.profileInfo.description}
            </Col>
          </Row>
          <Row className="text-center">
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              {this.state.profileInfo.followers} Followers
            </Col>
            <Col sm="6" md="4" xl="2" className="dancingscript py-3">
              {this.state.profileInfo.following} Following
            </Col>
            <Col sm="12" md="4" xl="2" className="dancingscript py-3">
              {this.state.profileInfo.posts} Posts
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Éditer</Button>
            </Col>
            <Col sm="6" xl="3">
              <Button className="button m-3 amatic">Message</Button>
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
            <Col sm="6" md="4" lg="3" xl="2">
              <Photo />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
