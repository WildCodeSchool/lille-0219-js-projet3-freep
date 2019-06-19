import React from "react";
import "../style/Footer.scss";
import { Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="fixed-bottom">
        <Row>
          <Col xs="12" md="6" className="littleInfo">
            Made with love by Wild Code School
          </Col>
          <Col
            xs="12"
            md="6"
            activeClassName="active"
            className="littleInfo"
            exact
            to="/CGU"
          >
            CGU
          </Col>
          <Col
            xs="12"
            md="6"
            activeClassName="active"
            className="littleInfo"
            exact
            to="/nouscontacter"
          >
            Nous contacter
          </Col>
          <Col
            xs="12"
            md="6"
            activelassName="active"
            className="littleInfo"
            exact
            to="/quisommesnous"
          >
            Qui sommes-nous ?
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
