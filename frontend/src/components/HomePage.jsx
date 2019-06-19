import React from "react";
import { Row, Col } from "reactstrap";
import Photo from "./Photo";
import axios from "axios";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picturesInfo: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5050/articles/`).then(({ data }) => {
      this.setState({
        picturesInfo: data
      });
    });
  }
  render() {
    const pictures = this.state.picturesInfo;
    return (
      <Row>
        {pictures.map((picture, key) => {
          return (
            <Col sm="6" md="4" lg="3" key={key}>
              <Photo picture={picture.url} link={picture.id_clothing} />

            </Col>
          );
        })}
      </Row>
    );
  }
}

export default HomePage;
