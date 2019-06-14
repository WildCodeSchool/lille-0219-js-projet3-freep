import React from "react";
import Messaging from "./Messaging";
import "../style/Messaging.scss";

class MessagingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="titleMessage">Messagerie</h1>
        <Messaging
          firstname="Ruby"
          lastname="Rose"
          avatar="/pictures/Ruby.jpg"
        />
        <Messaging
          firstname="Emma"
          lastname="Watson"
          avatar="/pictures/Emma.jpg"
        />
        <Messaging
          firstname="Jennifer"
          lastname="Lawrence"
          avatar="/pictures/Jennifer.jpg"
        />
        <Messaging
          firstname="Scarlett"
          lastname="Johansson"
          avatar="/pictures/Scarlett.jpg"
        />
        <Messaging
          firstname="Brie"
          lastname="Larson"
          avatar="/pictures/Brie.jpg"
        />
        <Messaging
          firstname="Angelina"
          lastname="Jolie"
          avatar="/pictures/Angelina.jpg"
        />
        <Messaging
          firstname="Sandra"
          lastname="Bullock"
          avatar="/pictures/Sandra.jpeg"
        />
        <Messaging
          firstname="Alexandra"
          lastname="Dadario"
          avatar="/pictures/Alexandra.jpeg"
        />
      </React.Fragment>
    );
  }
}

export default MessagingPage;
