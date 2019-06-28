import React from "react";
import axios from "axios";
import SearchResults from "./SearchResult";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import "../style/NavFreep.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      tableau: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const result = e.target.value;
    this.setState({ searchResult: result }, () => {
      axios
        .post(`http://localhost:5050/search`, {
          keyword: this.state.searchResult
        })
        .then(res => {
          console.log("test keyword : " + this.state.searchResult);
          console.log(res);
          this.setState({
            tableau: res.data.Results
          });
        })
        .catch(err => {
          console.log("Error :" + err);
        });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <form>
              <label htmlFor="clothe-profile-search">
                <input
                  id="searchfield"
                  name="searchname"
                  type="text"
                  placeholder="Chercher un vêtement, un profil..."
                  value={this.state.searchResult}
                  onChange={this.handleChange}
                />
                <Link to="/SearchResult">
                  <input type="submit" value="&#x1F50E;" />
                </Link>
              </label>
            </form>
          </Col>

          <SearchResults ClassName="SR" results={this.state.tableau} />
        </Row>
      </React.Fragment>
    );
  }
}

export default Search;
