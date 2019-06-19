import React from "react";

class Nickname extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <React.Fragment>
        <p className="dancingscript">{info.nickname}</p>
      </React.Fragment>
    );
  }
}

export default Nickname;
