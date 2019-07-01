import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import "../style/ClothingPage.scss";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      tableau: []
    };
  }

  render() {
    console.log("------------");
    console.log("restab : " + this.props.restab);
    console.log("------------");
    return (
      <Container>
        <ul>
          {this.props.restab.map(el => (
            <li>{el.description}</li>
          ))}
        </ul>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  restab: state
});

const SearchContainer = connect(mapStateToProps)(Search);

export default SearchContainer;
