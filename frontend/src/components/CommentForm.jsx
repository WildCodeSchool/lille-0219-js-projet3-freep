import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import axios from "axios";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comment: ""
    };
  }

  handleFieldChange = event => {
    const { value } = event.target;
    this.setState({
      comment: value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const articleId = this.props.article;
    let { comment } = this.state;
    axios
      .post(`http://localhost:5050/comment/${articleId}`, { content: comment })
      .then(({ data }) => {
        this.setState({
          loading: false,
          comment: ""
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    return (
      <Form
        className="comment-form"
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >
        <FormGroup>
          <Label>
            <h2>Et toi, qu'en penses-tu?</h2>
          </Label>
          <Col xs="9" lg="12" className="offset-3 offset-lg-0 p-0">
            <Input
              onChange={this.handleFieldChange}
              value={this.state.comment}
              type="text"
              name="message"
              placeholder="Ecris ton message ici"
            />
            <Row className="justify-content-end p-3">
              <Button>Envoyer</Button>
            </Row>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default CommentForm;
