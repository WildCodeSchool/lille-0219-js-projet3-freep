import React from "react";

const Nickname = props => {
  const info = props.info;
  return <p className="user-name m-3">{info.nickname}</p>;
};

export default Nickname;
