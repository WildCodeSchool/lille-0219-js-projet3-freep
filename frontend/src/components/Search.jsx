import React from "react";
import "../style/Avatar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Target, CloudLightning } from "react-feather";
import { Col, Row, Card, CardImg } from "reactstrap";
import ReportButton from "./ReportButton";
import Masonry from "react-masonry-component";

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
      <Masonry>
        {this.props.clothes.map(el => (
          <Col Col sm="6" md="4" lg="3">
            <Card className="m-2">
              <Link to={`/article/` + el.id}>
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
          </Col>
        ))}
        <hr />
        {this.props.users.map(e => (
          <React.Fragment>
            <Link to={`/profil/` + e.id}>
              <img src={e.avatar} className="avatar m-3" alt="Avatar" />
            </Link>
          </React.Fragment>
        ))}
      </Masonry>
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
