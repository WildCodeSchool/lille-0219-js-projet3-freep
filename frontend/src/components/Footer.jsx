import React from "react";
import "../style/Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer className="fixed-bottom">
        <p className="littleInfo">Made with love by Wild Code School</p>
        <p activeClassName="active" className="littleInfo" exact to="/CGU">
          CGU
        </p>
        <p
          activeClassName="active"
          className="littleInfo"
          exact
          to="/nouscontacter"
        >
          Nous contacter
        </p>
        <p
          activelassName="active"
          className="littleInfo"
          exact
          to="/quisommesnous"
        >
          Qui sommes-nous ?
        </p>
      </footer>
    );
  }
}

export default Footer;
