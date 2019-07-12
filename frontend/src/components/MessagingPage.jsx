// Page messagerie de base

import React from "react";
import Messaging from "./Messaging";
import axios from "axios";
import "../style/Messaging.scss";
import Loader from "./Loader";

class MessagingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagingArray: [{}],
      loading: true
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.id;
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        `http://localhost:5050/messagerie/${currentUser}
      `,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .then(({ data }) => {
        this.setState({
          messagingArray: data,
          loading: false
        });
      });
  }
  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <React.Fragment>
          <h1>Messagerie</h1>
          {this.state.messagingArray.length === 0 ? (
            <p>Vous n'avez pas de conversation en cours.</p>
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
                  id_reader={messaging.id_reader}
                  timeStamp={
                    messaging.date_diff >= 1
                      ? messaging.date_diff > 1
                        ? "Il y a " + messaging.date_diff + " jours"
                        : "Il y a " + messaging.date_diff + " jour"
                      : "Envoyé à " + messaging.hour_send
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
}

export default MessagingPage;
