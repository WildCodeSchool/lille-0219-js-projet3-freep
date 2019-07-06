import React from "react";
import ComingSoon from "../pictures/comingsoon.png";
import "../style/Partner.scss";

class Partner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="partner">
          <img src={ComingSoon} alt="coming soon" className="banner" />
          <p className="brand"> </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Partner;
