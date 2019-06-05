import React, { Fragment } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Navbar,
  NavLink,
  Nav,
  Form,
  Container, Row, Col
} from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing";
import { Plus, Mail, Heart, User } from "react-feather";
import "../style/navbar.css";

class NavFreep extends React.Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Container>
            <Row>
              <div className="header">
                <Col xs="2">
                  <Navbar color="black" light expand="md">
                    <img
                      className="logo"
                      src="https://via.placeholder.com/100"
                      alt="logo"
                    />
                  </Navbar>
                </Col>
                <Col xs="3">
                  <div className="title">
                    <span>Freep</span>
                    <br />
                    <span>La garde robe qui rapporte</span>
                  </div>
                </Col>
                <Col xs="4">
                  <Form className="recherche">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend" />
                      <Input
                        className="search"
                        placeholder="Rechercher un vêtement ou une cliente"
                      />
                    </InputGroup>
                  </Form>
                </Col>
                <Col xs="4">
                  <div className="picto">
                    <Nav className="d-flex ml-auto navhorizontal" navbar>
                      <NavLink href="#">
                        <Plus className="img" color="black" />
                      </NavLink>
                      <NavLink href="#">
                        <Mail className="img" color="black" />
                      </NavLink>
                      <NavLink href="#">
                        <Heart className="img" color="black" />
                      </NavLink>
                      <NavLink href="#">
                        <User className="img" color="black" />
                      </NavLink>
                    </Nav>
                  </div>
                </Col>
                <Routing />
              </div>
            </Row>
          </Container>
        </Router>
        <hr />
      </Fragment>
    );
  }
}
export default NavFreep;
