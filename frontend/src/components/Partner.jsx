import React from "react";
import BannerKiabi from "../pictures/BannerKiabi.jpg";
import "../style/Partner.css";

class Partner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="partner">
          <img src={BannerKiabi} alt="Kiabi" className="banner" />
          <p className="brand">Kiabi</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Partner;
