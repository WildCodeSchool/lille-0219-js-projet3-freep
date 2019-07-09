import React from "react";
import { connect } from "react-redux";
import "../style/ClothingPage.scss";
import { Link } from "react-router-dom";
import { Heart, Target } from "react-feather";
import { Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      tableau: []
    };
  }

  render() {
    return (
      <React.Fragment>
        <p>Clothes</p>
        {this.props.clothes.map(el => (
          <Card className="m-2">
            <Link to={`/article/`}>
              <CardImg src={el.url} alt="clothes" className="Photo" />
            </Link>
            <div className="overlay">
              <Row className="p-0 card-buttons align-items-center">
                <Heart color="white" />
                <Target color="white" />
                <ReportButton />
              </Row>
            </div>
          </Card>
        ))}
        <p>User</p>
        {this.props.users.map(e => (
          <Card className="m-2">
            <Link to={`/article/`}>
              <CardImg src={e.avatar} alt="users" className="Photo" />
            </Link>
            <div className="overlay">
              <Row className="p-0 card-buttons align-items-center">
                <Heart color="white" />
                <Target color="white" />
                <ReportButton />
              </Row>
            </div>
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    clothes: state.Results || [],
    users: state.ResultUsers || []
  };
};

const SearchContainer = connect(mapStateToProps)(Search);

export default SearchContainer;
