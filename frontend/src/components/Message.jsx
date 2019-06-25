// Page des conversations
import React from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardImg,
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
      messageArray: [{}]
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
    console.log("message:" + this.state.messageArray);
  }

  handleSubmit(e) {
    e.preventDefault();
    const P1 = this.props.match.params.P1;
    const P2 = this.props.match.params.P2;
    const content_form = e.target.value;
    axios
      .put(`http://localhost:5050/message/${P1}/${P2}`)
      .post(`http://localhost:5050/message/${P1}/${P2}`, {
        content: content_form
      })
      .then(({ data }) => {
        this.setState({
          messageArray: data
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/messagerie/2">
          <Button>
            <ArrowLeft />
          </Button>
        </Link>
        <Form>
          <FormGroup>
            <Label for="exampleText">Nouveau Message</Label>
            <Input type="textarea" name="text" id="exampleText" />
            <Button
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              Envoyer
            </Button>
          </FormGroup>
        </Form>
        {this.state.messageArray.length === 0 ? (
          <p>Vous n'avez pas de message.</p>
        ) : (
          ""
        )}
        {this.state.messageArray.map((message, i) => {
          return (
            <React.Fragment>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="3" sm="3" md="3">
                      <CardImg
                        src={message.avatar}
                        alt="Avatar"
                        className="imgAvatar rounded-circle"
                      />
                    </Col>
                    <Col xs="9" sm="9" md="9">
                      <div className="m-5">
                        <Row className="d-flex">
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
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Message;
