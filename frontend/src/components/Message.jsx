// Page des conversations
import React from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import "../style/Messaging.scss";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageArray: [{}],
      content_form: ""
    };
  }

  componentDidMount() {
    const P1 = this.props.match.params.P1;
    const P2 = this.props.match.params.P2;

    axios.get(`http://localhost:5050/message/${P1}/${P2}`).then(({ data }) => {
      this.setState({
        messageArray: data
      });
    });
  }

  handlePrev(e) {
    e.preventDefault();
    this.props.history.goBack();
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({
      content_form: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const P1 = this.props.match.params.P1;
    const P2 = this.props.match.params.P2;
    const { content_form } = this.state;

    axios
      .post(`http://localhost:5050/message/${P1}/${P2}`, {
        content: content_form
      })
      .then(({ data }) => {
        console.log(data);
        let messages = this.state.messageArray;
        data.hour_send = "l'instant";
        messages.unshift(data);
        this.setState(
          {
            content_form: "",
            messageArray: messages
          },
          () => {
            console.log(this.state.messageArray);
          }
        );
      })
      .catch(err => {
        console.log(`Nope! ${err}`);
      });
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Form
          className="message-form"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <FormGroup className="d-flex flex-column">
            <Row>
              <Col xs="2">
                <Link to="/messagerie/2">
                  <Button
                    onClick={e => {
                      this.handlePrev(e);
                    }}
                  >
                    <ArrowLeft />
                  </Button>
                </Link>
              </Col>
              <Col xs="8">
                <Label for="new-message" className="mx-2">
                  Nouveau Message
                </Label>
              </Col>
            </Row>
            <Input
              type="textarea"
              name="content_form"
              id="content_field"
              value={this.state.content_form}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <Button className="my-3 submit-button">Envoyer</Button>
          </FormGroup>
        </Form>
        {this.state.messageArray.length === 0 ? (
          <p>Vous n'avez pas de message.</p>
        ) : (
          ""
        )}
        {this.state.messageArray.map((message, i) => {
          return (
            <React.Fragment key={i}>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="3">
                      <img
                        src={message.avatar}
                        alt="Avatar"
                        className="imgAvatar rounded-circle"
                      />
                    </Col>
                    <Col xs="9">
                      <div className="mx-5 my-3">
                        <Row>
                          <Col>
                            <p className="name">{message.nickname}</p>
                          </Col>
                          <Col>
                            <p className="messageDate timeStamp">
                              {message.date_diff >= 1
                                ? "Il y a " + message.date_diff + " jours."
                                : "Envoyé à " + message.hour_send + "."}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p className="bodyText text-justify">
                            {message.content}
                          </p>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Message;
