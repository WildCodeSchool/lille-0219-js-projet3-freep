import React from "react";
import ComingSoon from "../pictures/comingsoon.png";
import "../style/Partner.scss";

const Partner = () => {
  return (
    <div className="partner">
      <img src={ComingSoon} alt="coming soon" className="banner" />
      <p className="brand"> </p>
    </div>
  );
};

export default Partner;
