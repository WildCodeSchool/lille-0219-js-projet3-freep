import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class SearcResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Results: []
    };
  }

  componentDidMount() {
    axios
      .post(`http://localhost:5050/search`, {
        keyword: this.state.searchResult
      })
      .then(({ data }) => {
        this.setState({
          nickname: data.nickname,
          type: data.type,
          id: data.id
        });
      })
      .catch(err => {
        console.log("Error :" + err);
      });
  }
  render() {
    return (
      <Row>
        <ul>
          {this.props.results.map(el => (
            <li>
              <Link to={`/article/${el.id}`}>{el.description}</Link>
            </li>
          ))}
        </ul>
      </Row>
    );
  }
}

export default SearcResults;
