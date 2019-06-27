import React from "react";
import Borrow from "./Borrow";
import axios from "axios";
import Loader from "./Loader";

class BorrowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      borrowArray: [{}],
      loading: true
    };
  }

  componentDidMount() {
    this.refresh();
  }
  refresh() {
    this.setState({
      userId: this.props.match.params.userId
    });
    axios
      .get(`http://localhost:5050/emprunt/${this.props.match.params.userId}`)
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
          <h1>Souhait d'emprunt de vêtement</h1>
          {this.state.borrowArray.length === 0 ? (
            <p>Vous n'avez pas d'emprunt en cours.</p>
          ) : (
            ""
          )}
          {this.state.borrowArray.map((borrow, i) => {
            return (
              borrow && (
                <Borrow
                  key={i}
                  pictureUrl={borrow.url}
                  clothePage={borrow.id_clothing}
                  borrowId={borrow.id}
                  userId={this.props.match.params.userId}
                  listRefresh={this.refresh}
                />
              )
            );
          })}
        </React.Fragment>
      );
    }
  }
}

export default BorrowPage;
