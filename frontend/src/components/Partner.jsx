import React from "react";
import BannerKiabi from "../pictures/BannerKiabi.jpg";

class Partner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src={BannerKiabi} alt="Kiabi" />
        <p>Kiabi</p>
      </React.Fragment>
    );
  }
}

export default Partner;
