import React from "react";

class Nickname extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <React.Fragment>
        <span className="primaryfont m-3">{info.nickname}</span>
      </React.Fragment>
    );
  }
}

export default Nickname;
