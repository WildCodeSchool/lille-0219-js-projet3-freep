import React from "react";
import Borrow from "./Borrow";
import axios from "axios";
import Loader from "./Loader";
import { Col } from "reactstrap";
import "../style/Borrow.scss";
import Masonry from "react-masonry-component";
import { backend } from "../conf";

class BorrowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowArray: [{}],
      loading: true
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId: this.props.match.params.userId
    });
    axios
      .get(`${backend}/emprunt/${this.props.match.params.userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(({ data }) => {
        this.setState({
          borrowArray: data,
          loading: false
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <React.Fragment>
          <h1>Ce que je veux emprunter</h1>
          {this.state.borrowArray.length === 0 ? (
            <p>Vous n'avez pas d'emprunt en cours.</p>
          ) : null}
          <Masonry>
            {this.state.borrowArray.map((borrow, i) => {
              return (
                borrow && (
                  <Col sm="6" md="4" lg="3" xl="3" key={i}>
                    <Borrow
                      key={i}
                      pictureUrl={borrow.url}
                      clothePage={borrow.id_clothing}
                      borrowId={borrow.id}
                    />
                  </Col>
                )
              );
            })}
          </Masonry>
        </React.Fragment>
      );
    }
  }
}

export default BorrowPage;
