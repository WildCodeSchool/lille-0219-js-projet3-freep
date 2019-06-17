import React from "react";
import Messaging from "./Messaging";
import axios from "axios";

class MessagingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      (messagingPageInfo = {
        nickname: "",
        avatar: "",
        timeStamp: "",
        message: ""
      })
    ];
  }

  componentDidMount() {
    const idReader = this.props.match.params.idReader;

    axios
      .get(`http://localhost:5050/messagerie/${idReader}`)
      .then(({ data }) => {
        this.setState({
          nickname: data[0].nickname,
          avatar: data[0].avatar,
          timeStamp: data[0].created_at,
          message: data[0].content
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Messagerie</h1>
        <Messaging
          nickname={this.state.nickname}
          avatar={this.state.avatar}
          timeStamp={this.state.timeStamp}
          message={this.state.message}
        />
      </React.Fragment>
    );
  }
}

export default MessagingPage;
