import React from "react";
import "../style/Avatar.css";

class Avatar extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <React.Fragment>
        <img src={info.avatar} className="avatar m-3" alt="Avatar" />
      </React.Fragment>
    );
  }
}

export default Avatar;
