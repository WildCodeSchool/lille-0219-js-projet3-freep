import React from "react";

class Nickname extends React.Component {
  render() {
    const info = this.props.info;
    return (
      <React.Fragment>
        <p className="dancingscript">{info.username}</p>
      </React.Fragment>
    );
  }
}

export default Nickname;
