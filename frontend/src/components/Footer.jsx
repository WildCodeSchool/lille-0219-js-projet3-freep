import React from "react";
import "../style/Footer.scss";
import { Col } from "reactstrap";
import classnames from "classnames";
import { Heart } from "react-feather";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    return (
      <footer
        className="row fixed-bottom p-1 justify-content-center m-0"
        className={classnames(
          "footer row fixed-bottom p-1 justify-content-center m-0",
          {
            "footer--hidden": !this.state.visible
          }
        )}
      >
        <Col xs="12" sm="3" className="text-center">
          Made with
          <span role="img" aria-label="" className="footer-heart">
            <Heart />
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
