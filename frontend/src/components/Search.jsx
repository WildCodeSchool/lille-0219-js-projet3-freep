import React from "react";
import axios from "axios";
import "../style/NavFreep.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: ""
    };
    //this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const toto = e.target.value;
    this.setState({ searchResult: toto }, () => {
      axios
        .post(`http://localhost:5050/search`, {
          keyword: this.state.searchResult
        })
        .then(({ data }) => {
          console.log("test keyword : " + this.state.searchResult);
        })
        .catch(err => {
          console.log("Error :" + err);
          // console.log("searchfield : " + keyword);
        });
    });
  };

  render() {
    return (
      <React.Fragment>
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
            <input type="submit" value="&#x1F50E;" />
          </label>
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
