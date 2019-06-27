import React from "react";
import { Row, Col } from "reactstrap";
import Photo from "./Photo";
import axios from "axios";
import Loader from "./Loader";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      picturesInfo: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5050/articles/`).then(({ data }) => {
      this.setState({
        picturesInfo: data,
        loading: false
      });
    });
  }
  render() {
    const pictures = this.state.picturesInfo;
    if (this.state.loading) {
      return <Loader />;
    } else {
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
}

export default HomePage;
