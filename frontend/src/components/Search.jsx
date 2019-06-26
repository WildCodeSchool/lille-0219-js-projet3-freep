import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const query = this.props.match.params.search;
    axios
      .get(
        `
    SELECT clothing.type, clothing.description FROM clothing WHERE clothing.type LIKE '%${res}%' OR clothing.description LIKE '%${res}%' 
    `
      )
      .then(response => {
        this.setState({
          res: response.data.results
        });
      });
  }
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row ">
          <div className="gallery-type">
            {this.state.movies.map((film, idx) => {
              return <div className="m-1" />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
