// Page messagerie de base

import React from "react";
import Messaging from "./Messaging";
import axios from "axios";
import "../style/Messaging.scss";

class MessagingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagingArray: [{}]
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
        <h1 className="titleMessage">Messagerie</h1>
        {this.state.messagingArray.length === 0 ? (
          <p>Vous n'avez pas de conversation.</p>
        ) : (
          ""
        )}
        {this.state.messagingArray.map((messaging, i) => {
          return (
            messaging && (
              <Messaging
                key={i}
                nickname={messaging.nickname}
                avatar={messaging.avatar}
                id_author={messaging.id_author}
                timeStamp={
                  messaging.date_diff >= 1
                    ? "Il y a " + messaging.date_diff + " jours."
                    : "Envoyé à " + messaging.hour_send + "."
                }
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
