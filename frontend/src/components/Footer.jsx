import React from "react";
import "../style/Footer.scss";
import { breakStatement } from "@babel/types";
import { Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="row fixed-bottom p-1 justify-content-center m-0">
        <Col xs="12" sm="3" className="text-center made-with">
          Made with
          <span role="img" aria-label="" className="px-2">
            ❤️
          </span>
          by Wild Code School
        </Col>
        <Col
          xs="12"
          sm="9"
          className="d-flex p-0 m-0 justify-content-center text-center"
        >
          <Col xs="2" sm="3" className="p-0">
            CGU
          </Col>
          <Col xs="4" sm="3" className="p-0">
            Nous contacter
          </Col>
          <Col xs="6" sm="3" className="p-0">
            Qui sommes-nous ?
          </Col>
        </Col>
      </footer>
    );
  }
}

export default Footer;
