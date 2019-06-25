import React from "react";
import "../style/Footer.scss";
import { Row, Col } from "reactstrap";
import { breakStatement } from "@babel/types";

class Footer extends React.Component {
  render() {
    return (
      <footer className="fixed-bottom">
        <Row>
          <Col xs="12" md="4" className="littleInfo">
            Qui sommes-nous ?
          </Col>
          <Col
            xs="12"
            md="4"
            activeClassName="active"
            className="littleInfo"
            exact
            to="/CGU"
          >
            CGU
          </Col>
          <Col
            xs="12"
            md="4"
            activeClassName="active"
            className="littleInfo"
            exact
            to="/nouscontacter"
          >
            Nous contacter
          </Col>
          <Col
            xs="12"
            md="4"
            activelassName="active"
            className="littleInfo"
            exact
            to="/MadewithlovebuWildCodeSchool"
          >
            Made with love by Wild Code School
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
