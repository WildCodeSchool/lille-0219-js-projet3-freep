import React from "react";
import Messaging from "./Messaging";
import axios from "axios";

class MessagingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagingArray: [
        {
          nickname: "",
          avatar: "",
          timeStamp: "",
          message: ""
        }
      ]
    };
  }

  componentDidMount() {
    const idReader = this.props.match.params.idReader;

    axios
      .get(`http://localhost:5050/messagerie/${idReader}`)
      .then(({ data }) => {
        this.setState({
          messagingArray: data
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Messagerie</h1>
        {this.state.messagingArray.map((messaging, i) => {
          console.log("messaging:" + messaging.nickname);
          return (
            messaging && (
              <Messaging
                key={i}
                nickname={messaging.nickname}
                avatar={messaging.avatar}
                timeStamp={messaging.created_at}
                message={messaging.content}
              />
            )
          );
        })}
      </React.Fragment>
    );
  }
}

export default MessagingPage;
